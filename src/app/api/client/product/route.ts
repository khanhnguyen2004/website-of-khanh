import { NextResponse } from 'next/server';
import { pool } from '@/lib/db';
import sql from 'mssql';

export async function GET() {
    try {
        const connection = await pool;
        const result = await connection.request()
            .query(`SELECT * FROM products ORDER BY created_at DESC`);
        const products = result.recordset.map((row: any) => ({
            id: row.id,
            name: row.name,
            price: parseFloat(row.price),
            discount: parseInt(row.discount),
            image: row.image || '',
            created_at: row.created_at.toISOString(),
        }));
        return NextResponse.json(products);
    } catch (err: any) {
        return NextResponse.json({ success: false, error: err.message }, { status: 500 });
    }
}