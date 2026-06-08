import * as CryptoJS from 'crypto-js';
import { UserProfile } from '@/types/bridge.types';

export const SECRET_KEY = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

export function uppercase(str: string): string {
  return str.toUpperCase();
}

export async function hmacSHA256(data: string, secret: string): Promise<string> {
  const hash = CryptoJS.HmacSHA256(data, secret);
  return hash.toString(CryptoJS.enc.Hex);
}

export async function verifyHMAC(data: UserProfile, secret: string): Promise<boolean> {
  if (!data.signature) return false;
  const { signature, ...payload } = data as any;
  const plainText = JSON.stringify(payload);
  const signatureVerify = await hmacSHA256(uppercase(plainText), secret).then(
    (hashedValue: string) => uppercase(hashedValue),
  );
  return signatureVerify === uppercase(signature);
}
