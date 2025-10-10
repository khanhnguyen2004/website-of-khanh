import { NextResponse } from 'next/server';
import { pool } from '@/lib/db';
import sql from 'mssql';
import path from 'path';
import fs from "fs/promises";

export async function PUT(request: Request) {
    try {
        const { id, name, price, discount, image } = await request.json();
        const connection = await pool;
        await connection.request()
            .input('id', sql.Int, id)
            .input('name', sql.NVarChar(100), name)
            .input('price', sql.Decimal(18, 2), price)
            .input('discount', sql.Int, discount || 0)
            .input('image', sql.NVarChar(255), image)
            .query(`UPDATE products SET name=@name, price=@price, discount=@discount, image=@image WHERE id=@id`);
        return NextResponse.json({ success: true });
    } catch (err: any) {
        return NextResponse.json({ success: false, error: err.message }, { status: 500 });
    }
}
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    const productId = parseInt(params.id);
    try {
        const connection = await pool;
        const result = await connection.request()
            .input('id', sql.Int, productId)
            .query(`SELECT image FROM products WHERE id=@id`);
        if (result.recordset.length === 0) {
            return NextResponse.json({ success: false, message: "Product not found." }, { status: 404 });
        }
        const imagePath = result.recordset[0].image;
        await connection.request()
            .input('id', sql.Int, productId)
            .query(`DELETE FROM products WHERE id=@id`);
        if (imagePath && imagePath.startsWith('/uploads/')) {
            const absolutePath = path.join(process.cwd(), 'public', imagePath);
            await fs.unlink(absolutePath);
        }
        return NextResponse.json({ success: true });
    } catch (err: any) {
        return NextResponse.json({ success: false, error: err.message }, { status: 500 });
    }
}