import { createCipheriv, createDecipheriv, randomBytes, createHash } from "crypto";

const ALGO = "aes-256-gcm";
const IV_LEN = 12;

function k(secret: string) {
  return createHash("sha256").update(secret).digest();
}

export type EncBlob = { iv: string; tag: string; data: string };

export function encrypt(plaintext: string, secret: string): EncBlob {
  const iv = randomBytes(IV_LEN);
  const cipher = createCipheriv(ALGO, k(secret), iv);
  const enc = Buffer.concat([cipher.update(plaintext, "utf8"), cipher.final()]);
  const tag = cipher.getAuthTag();
  return { iv: iv.toString("base64"), tag: tag.toString("base64"), data: enc.toString("base64") };
}

export function decrypt(blob: EncBlob, secret: string): string {
  const iv = Buffer.from(blob.iv, "base64");
  const tag = Buffer.from(blob.tag, "base64");
  const data = Buffer.from(blob.data, "base64");
  const decipher = createDecipheriv(ALGO, k(secret), iv);
  decipher.setAuthTag(tag);
  const dec = Buffer.concat([decipher.update(data), decipher.final()]);
  return dec.toString("utf8");
}
