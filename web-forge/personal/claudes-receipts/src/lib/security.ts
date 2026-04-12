import { createHash, randomBytes, timingSafeEqual } from "crypto";

export function createIngestKey() {
  return randomBytes(24).toString("base64url");
}

export function hashIngestKey(key: string) {
  return createHash("sha256").update(key).digest("hex");
}

export function ingestKeyMatches(key: string, expectedHash: string) {
  const candidate = Buffer.from(hashIngestKey(key), "hex");
  const stored = Buffer.from(expectedHash, "hex");

  if (candidate.length !== stored.length) {
    return false;
  }

  return timingSafeEqual(candidate, stored);
}
