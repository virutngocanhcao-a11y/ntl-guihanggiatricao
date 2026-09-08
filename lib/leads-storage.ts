import { GetObjectCommand, PutObjectCommand, ListObjectsV2Command } from "@aws-sdk/client-s3";
import { getR2Client, isR2Configured } from "./r2-client";

export interface StoredLead {
  id: string;
  fullName: string;
  company: string;
  phone: string;
  cargoType: string;
  source: string;
  submittedAt: string;
  ip?: string;
}

const LEADS_PREFIX = "leads/";

export async function saveLead(lead: Omit<StoredLead, "id" | "submittedAt">): Promise<StoredLead | null> {
  if (!isR2Configured()) return null;
  const now = new Date();
  const id = `${now.getTime()}-${Math.random().toString(36).slice(2, 8)}`;
  const stored: StoredLead = {
    ...lead,
    id,
    submittedAt: now.toISOString(),
  };
  try {
    const client = getR2Client();
    await client.send(
      new PutObjectCommand({
        Bucket: process.env.R2_BUCKET_NAME,
        Key: `${LEADS_PREFIX}${id}.json`,
        Body: JSON.stringify(stored, null, 2),
        ContentType: "application/json",
      })
    );
    return stored;
  } catch (err) {
    console.error("[leads-storage] Failed to save lead:", err);
    return null;
  }
}

export async function listLeads(): Promise<StoredLead[]> {
  if (!isR2Configured()) return [];
  try {
    const client = getR2Client();
    const listRes = await client.send(
      new ListObjectsV2Command({
        Bucket: process.env.R2_BUCKET_NAME,
        Prefix: LEADS_PREFIX,
        MaxKeys: 1000,
      })
    );
    const keys = (listRes.Contents || []).map((obj) => obj.Key!).filter(Boolean);
    const leads: StoredLead[] = [];
    for (const key of keys) {
      try {
        const getRes = await client.send(
          new GetObjectCommand({
            Bucket: process.env.R2_BUCKET_NAME,
            Key: key,
          })
        );
        const text = await getRes.Body?.transformToString();
        if (text) leads.push(JSON.parse(text));
      } catch { /* skip corrupted entries */ }
    }
    // Sort newest first
    leads.sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime());
    return leads;
  } catch (err) {
    console.error("[leads-storage] Failed to list leads:", err);
    return [];
  }
}
