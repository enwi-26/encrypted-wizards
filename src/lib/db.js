import { kv, createClient as createKvClient } from "@vercel/kv";
import { createClient as createRedisClient } from "redis";
import fs from "fs";
import path from "path";

// Supported environment variables for Redis/KV
const restUrl = process.env.KV_REST_API_URL || process.env.STORAGE_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
const restToken = process.env.KV_REST_API_TOKEN || process.env.STORAGE_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
const tcpUrl = process.env.REDIS_URL || process.env.KV_URL || process.env.STORAGE_URL;

const hasCloudDb = !!(tcpUrl || (restUrl && restToken));
const hasBlobToken = !!process.env.BLOB_READ_WRITE_TOKEN;
const isVercel = !!process.env.VERCEL;

// We enforce cloud storage in Vercel, or if variables are explicitly present in development
export const isCloudStorage = isVercel || (hasCloudDb && hasBlobToken);

/**
 * Returns diagnostic details about environment variables to help troubleshoot deployment configuration.
 */
export function getDbDiagnostics() {
  const missing = [];
  const found = [];

  if (process.env.BLOB_READ_WRITE_TOKEN) {
    found.push("BLOB_READ_WRITE_TOKEN");
  } else {
    missing.push("BLOB_READ_WRITE_TOKEN");
  }

  // Check Redis variables
  const redisVars = {
    KV_REST_API_URL: !!process.env.KV_REST_API_URL,
    KV_REST_API_TOKEN: !!process.env.KV_REST_API_TOKEN,
    STORAGE_REST_API_URL: !!process.env.STORAGE_REST_API_URL,
    STORAGE_REST_API_TOKEN: !!process.env.STORAGE_REST_API_TOKEN,
    UPSTASH_REDIS_REST_URL: !!process.env.UPSTASH_REDIS_REST_URL,
    UPSTASH_REDIS_REST_TOKEN: !!process.env.UPSTASH_REDIS_REST_TOKEN,
    REDIS_URL: !!process.env.REDIS_URL,
    KV_URL: !!process.env.KV_URL,
    STORAGE_URL: !!process.env.STORAGE_URL,
  };

  const hasRest = (redisVars.KV_REST_API_URL && redisVars.KV_REST_API_TOKEN) ||
                  (redisVars.STORAGE_REST_API_URL && redisVars.STORAGE_REST_API_TOKEN) ||
                  (redisVars.UPSTASH_REDIS_REST_URL && redisVars.UPSTASH_REDIS_REST_TOKEN);

  const hasTcp = redisVars.REDIS_URL || redisVars.KV_URL || redisVars.STORAGE_URL;

  for (const [k, v] of Object.entries(redisVars)) {
    if (v) found.push(k);
  }

  if (!hasRest && !hasTcp) {
    missing.push("Redis/KV connection (e.g. KV_REST_API_URL + KV_REST_API_TOKEN, UPSTASH_REDIS_REST_URL + UPSTASH_REDIS_REST_TOKEN, REDIS_URL, KV_URL, or STORAGE_URL)");
  }

  return {
    isVercel,
    hasCloudDb: hasRest || !!hasTcp,
    hasBlobToken,
    isCloudStorage,
    foundVariables: found,
    missingVariables: missing,
    errorMsg: (isVercel && (!hasBlobToken || (!hasRest && !hasTcp)))
      ? `Cloud database variables not found. Missing: ${missing.join(", ")}. Found: ${found.join(", ") || "None"}. Please verify you linked both Vercel Redis (Upstash) & Vercel Blob in your project Storage panel, then REDEPLOY the project to apply them.`
      : null
  };
}

/**
 * Saves a new application to either the cloud database or local filesystem.
 */
export async function saveApplication(newApplication) {
  if (isCloudStorage) {
    if (restUrl && restToken) {
      if (process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN) {
        await kv.lpush("applications", JSON.stringify(newApplication));
      } else {
        const client = createKvClient({ url: restUrl, token: restToken });
        await client.lpush("applications", JSON.stringify(newApplication));
      }
    } else if (tcpUrl) {
      const client = createRedisClient({ url: tcpUrl });
      await client.connect();
      await client.lPush("applications", JSON.stringify(newApplication));
      await client.quit();
    } else {
      throw new Error("Cloud database configuration is incomplete.");
    }
  } else {
    // Fallback: Save application to applications.json locally
    const dataDir = path.join(process.cwd(), "src", "data");
    const applicationsFilePath = path.join(dataDir, "applications.json");
    
    // Ensure parent directory exists locally
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    let applications = [];
    if (fs.existsSync(applicationsFilePath)) {
      try {
        const fileContent = await fs.promises.readFile(applicationsFilePath, "utf8");
        applications = JSON.parse(fileContent || "[]");
      } catch (err) {
        console.error("Error reading applications.json, resetting to empty array", err);
        applications = [];
      }
    }

    applications.push(newApplication);

    await fs.promises.writeFile(
      applicationsFilePath,
      JSON.stringify(applications, null, 2),
      "utf8"
    );
  }
}

/**
 * Retrieves all applications from either the cloud database or local filesystem.
 */
export async function getApplications() {
  if (isCloudStorage) {
    let list = [];
    if (restUrl && restToken) {
      if (process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN) {
        list = await kv.lrange("applications", 0, -1);
      } else {
        const client = createKvClient({ url: restUrl, token: restToken });
        list = await client.lrange("applications", 0, -1);
      }
    } else if (tcpUrl) {
      const client = createRedisClient({ url: tcpUrl });
      await client.connect();
      list = await client.lRange("applications", 0, -1);
      await client.quit();
    } else {
      throw new Error("Cloud database configuration is incomplete.");
    }

    return list.map(item => {
      try {
        return typeof item === "string" ? JSON.parse(item) : item;
      } catch (e) {
        return item;
      }
    });
  } else {
    // Fallback: Retrieve locally from applications.json
    const dataFilePath = path.join(process.cwd(), "src", "data", "applications.json");
    if (fs.existsSync(dataFilePath)) {
      try {
        const fileContent = await fs.promises.readFile(dataFilePath, "utf8");
        return JSON.parse(fileContent || "[]");
      } catch (err) {
        console.error("Error reading applications.json", err);
        throw new Error("Failed to read application records.");
      }
    }
    return [];
  }
}
