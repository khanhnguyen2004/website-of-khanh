import { NextResponse } from 'next/server';
import { pool } from '@/lib/db';
import sql from 'mssql';

export async function GET(request: Request) {
    try {
        const connection = await pool;
        const result = await connection.request()
            .query(`SELECT * FROM products ORDER BY id ASC`);
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
export async function POST(request: Request) {
    try {
        const { name, price, discount, image } = await request.json();
        const connection = await pool;
        const result = await connection.request()
            .input('name', sql.NVarChar(100), name)
            .input('price', sql.Decimal(18, 2), price)
            .input('discount', sql.Int, discount || 0)
            .input('image', sql.NVarChar(255), image)
            .query(`INSERT INTO products (name, price, discount, image) OUTPUT INSERTED.id VALUES (@name, @price, @discount, @image)`);
        const newId = result.recordset[0].id;
        return NextResponse.json({ success: true, id: newId });
    } catch (err: any) {
        return NextResponse.json({ success: false, error: err.message }, { status: 500 });
    }
}