import CryptoJS from "crypto-js";
import { ENV } from "@/env";

export function encrypt(key: string): string {
  const secret = ENV.CRYPTO_SECRET;
  if (!secret) {
    throw new Error('CRYPTO_SECRET is not defined in environment variables.');
  }
  const encrypted = CryptoJS.AES.encrypt(key, secret).toString()
  const encoded = CryptoJS.enc.Base64.parse(encrypted).toString(CryptoJS.enc.Hex);
  return encoded;
}

export function decrypt(key: string): string {
  const secret = ENV.CRYPTO_SECRET;
  if (!secret) {
    throw new Error('CRYPTO_SECRET is not defined in environment variables.');
  }
  const decoded = CryptoJS.enc.Hex.parse(key).toString(CryptoJS.enc.Base64);
  const decrypted = CryptoJS.AES.decrypt(decoded, secret).toString(CryptoJS.enc.Utf8);
  return decrypted;
}
