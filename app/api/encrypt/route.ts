import { NextResponse } from 'next/server';
import { encrypt } from '@/lib/utils/string-encryption';

export async function POST(request: Request) {
  try {
    const { key } = await request.json();
    const encryptedValue = encrypt(key);
    return NextResponse.json({ encrypted: encryptedValue });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: 'An error occurred encrypting string.' }, { status: 500 });
  }
}
