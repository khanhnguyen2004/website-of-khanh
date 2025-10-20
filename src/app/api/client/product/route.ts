import { NextResponse } from 'next/server';
import { config } from '@/lib/db';
import { Product } from '@/types/products';

export async function GET() {
    try {
        const connection = await config;
        const [product] = await connection.execute(`SELECT * FROM products ORDER BY created_at DESC`);
        const productResult = product as Product[];
        const products = productResult.map(row => ({
            id: row.id,
            name: row.name,
            price: row.price,
            discount: row.discount,
            image: row.image || '',
            created_at: row.created_at,
        }));
        return NextResponse.json(products);
    } catch (e: unknown) {
        const message = e instanceof Error ? e.message : String(e);
        return NextResponse.json({ success: false, error: message }, { status: 500 });
    }
}