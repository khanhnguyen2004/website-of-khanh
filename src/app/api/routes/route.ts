// src/app/api/routes/route.ts
import { NextResponse } from 'next/server';
import { pool } from '@/utils/db';

export async function GET() {
    try {
        const request = await pool;
        const result = await request.request().query('SELECT GETDATE() AS now');
        return NextResponse.json({ success: true, time: result.recordset[0] });
    } catch (err: any) {
        return NextResponse.json({ success: false, error: err.message }, { status: 500 });
    }
}
