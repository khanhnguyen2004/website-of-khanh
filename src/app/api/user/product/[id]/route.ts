import { NextResponse } from 'next/server';
import { config } from '@/lib/db';
import path from 'path';
import fs from "fs/promises";
import { Product } from '@/types/products';
export async function PUT(request: Request) {
    try {
        const { id, name, price, discount, image } = await request.json();
        const connection = await config;

        await connection.execute(`UPDATE products SET name=?, price=?, discount=?, image=? WHERE id=?`, [name, price, discount, image, id]);
        return NextResponse.json({ success: true });
    } catch (e: unknown) {
        const message = e instanceof Error ? e.message : String(e);
        return NextResponse.json({ success: false, error: message }, { status: 500 });
    }
}
export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    try {
        const connection = await config;

        const [products] = await connection.execute(`SELECT image FROM products WHERE id=?`, [id]);
        const productResult = products as Product[];
        if (productResult.length === 0) {
            return NextResponse.json({ success: false, message: "Product not found." }, { status: 404 });
        }
        const imagePath = productResult[0].image;
        await connection.execute(`DELETE FROM products WHERE id=?`, [id]);
        if (imagePath && imagePath.startsWith('/uploads/')) {
            const absolutePath = path.join(process.cwd(), 'public', imagePath);
            await fs.unlink(absolutePath);
        }
        return NextResponse.json({ success: true });
    } catch (e: unknown) {
        const message = e instanceof Error ? e.message : String(e);
        return NextResponse.json({ success: false, error: message }, { status: 500 });
    }
}