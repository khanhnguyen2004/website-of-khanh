// src/app/api/routes/route.ts
import { NextResponse } from 'next/server';
import { config } from '@/lib/db';

export async function GET() {
    try {
        const request = await config;
        const result = await request.execute('SELECT CURRENT_TIMESTAMP() AS now');
        return NextResponse.json({ success: true, time: result[0] });
    } catch (e: unknown) {
        const message = e instanceof Error ? e.message : String(e);
        return NextResponse.json({ success: false, error: message }, { status: 500 });
    }
}
