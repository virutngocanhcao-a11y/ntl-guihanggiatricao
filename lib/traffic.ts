import { GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { getR2Client, isR2Configured } from "./r2-client";

const TRAFFIC_KEY = "traffic-counter.json";

interface TrafficData {
  totalVisits: number;
  lastUpdated: string;
}

async function getTrafficData(): Promise<TrafficData> {
  if (!isR2Configured()) return { totalVisits: 0, lastUpdated: new Date().toISOString() };
  try {
    const client = getR2Client();
    const res = await client.send(
      new GetObjectCommand({
        Bucket: process.env.R2_BUCKET_NAME,
        Key: TRAFFIC_KEY,
      })
    );
    const text = await res.Body?.transformToString();
    if (text) return JSON.parse(text);
  } catch { /* file doesn't exist yet */ }
  return { totalVisits: 0, lastUpdated: new Date().toISOString() };
}

async function saveTrafficData(data: TrafficData): Promise<void> {
  if (!isR2Configured()) return;
  const client = getR2Client();
  await client.send(
    new PutObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME,
      Key: TRAFFIC_KEY,
      Body: JSON.stringify(data),
      ContentType: "application/json",
    })
  );
}

export async function incrementVisitCount(): Promise<number> {
  const data = await getTrafficData();
  data.totalVisits += 1;
  data.lastUpdated = new Date().toISOString();
  await saveTrafficData(data).catch((err) =>
    console.error("[traffic] Failed to save:", err)
  );
  return data.totalVisits;
}

export async function getVisitCount(): Promise<number> {
  const data = await getTrafficData();
  return data.totalVisits;
}
