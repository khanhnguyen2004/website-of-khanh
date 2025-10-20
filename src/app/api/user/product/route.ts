import { NextResponse } from 'next/server';
import { config } from '@/lib/db';
import { Product } from '@/types/products';

export async function GET(request: Request) {
    try {
        const connection = await config;
        const [product] = await connection.execute(`SELECT * FROM products ORDER BY id ASC`);

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
export async function POST(request: Request) {
    try {
        const { name, price, discount, image } = await request.json();
        const connection = await config;
        const [product] = await connection.execute(`INSERT INTO products (name, price, discount, image) OUTPUT INSERTED.id VALUES (?, ?, ?, ?)`, [name, price, discount, image]);

        const productResult = product as Product[];
        const newId = productResult[0].id;
        return NextResponse.json({ success: true, id: newId });
    } catch (e: unknown) {
        const message = e instanceof Error ? e.message : String(e);
        return NextResponse.json({ success: false, error: message }, { status: 500 });
    }
}