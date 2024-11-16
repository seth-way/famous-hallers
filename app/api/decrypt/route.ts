'use server';
import { NextResponse } from 'next/server';
import { decrypt } from '@/lib/utils/string-encryption';

export async function POST(request: Request) {
  try {
    const { hash } = await request.json();
    const decryptedValue = decrypt(hash);
    return NextResponse.json({ decrypted: decryptedValue });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    // Handle non-Error exceptions
    return NextResponse.json({ error: 'An unknown error decrypting player hash' }, { status: 500 });
  }
}
