import { GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { getR2Client, isR2Configured } from "./r2-client";

const TRAFFIC_KEY = "traffic-counter.json";
const ONLINE_KEY = "traffic-online.json";
// Cùng ngưỡng "đang online" với trang Quốc tế (90 giây không ping = coi như rời trang)
const ONLINE_WINDOW_MS = 90 * 1000;

interface TrafficData {
  totalVisits: number;
  lastUpdated: string;
}

type OnlineMap = Record<string, string>; // sessionId -> ISO timestamp lần ping gần nhất

async function readJson<T>(key: string, fallback: T): Promise<T> {
  if (!isR2Configured()) return fallback;
  try {
    const client = getR2Client();
    const res = await client.send(
      new GetObjectCommand({ Bucket: process.env.R2_BUCKET_NAME, Key: key })
    );
    const text = await res.Body?.transformToString();
    if (text) return JSON.parse(text) as T;
  } catch {
    /* chưa có file — dùng giá trị mặc định */
  }
  return fallback;
}

async function writeJson(key: string, data: unknown): Promise<void> {
  if (!isR2Configured()) return;
  const client = getR2Client();
  await client.send(
    new PutObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME,
      Key: key,
      Body: JSON.stringify(data),
      ContentType: "application/json",
    })
  );
}

export async function incrementVisitCount(): Promise<number> {
  const data = await readJson<TrafficData>(TRAFFIC_KEY, {
    totalVisits: 0,
    lastUpdated: new Date().toISOString(),
  });
  data.totalVisits += 1;
  data.lastUpdated = new Date().toISOString();
  await writeJson(TRAFFIC_KEY, data).catch((err) => console.error("[traffic] Failed to save:", err));
  return data.totalVisits;
}

export async function getVisitCount(): Promise<number> {
  return (await readJson<TrafficData>(TRAFFIC_KEY, { totalVisits: 0, lastUpdated: "" })).totalVisits;
}

function pruneOnline(data: OnlineMap): OnlineMap {
  const cutoff = Date.now() - ONLINE_WINDOW_MS;
  const result: OnlineMap = {};
  for (const [id, ts] of Object.entries(data)) {
    if (Date.parse(ts) >= cutoff) result[id] = ts;
  }
  return result;
}

/** Ghi nhận 1 phiên đang hoạt động, trả về số người đang online sau khi cập nhật. */
export async function pingOnline(sessionId: string): Promise<number> {
  const data = pruneOnline(await readJson<OnlineMap>(ONLINE_KEY, {}));
  data[sessionId] = new Date().toISOString();
  await writeJson(ONLINE_KEY, data).catch((err) => console.error("[traffic] Failed to save online:", err));
  return Object.keys(data).length;
}

export async function getOnlineCount(): Promise<number> {
  return Object.keys(pruneOnline(await readJson<OnlineMap>(ONLINE_KEY, {}))).length;
}
