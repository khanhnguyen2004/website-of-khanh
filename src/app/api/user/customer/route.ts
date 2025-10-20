import { NextResponse } from 'next/server';
import { config } from '@/lib/db';
import { InfoUsers } from '@/types/users';

export async function GET(request: Request) {
    try {
        const connection = await config;
        const [customers] = await connection.execute(`SELECT u.username, iu.* FROM infoUsers iu JOIN users u ON iu.idUser=u.id WHERE u.role IN ('client') ORDER BY iu.id ASC`);

        const customerResult = customers as InfoUsers[];
        const customer = customerResult.map(row => ({
            id: row.id,
            username: row.username || '',
            firstName: row.firstName || '',
            lastName: row.lastName || '',
            email: row.email || '',
            phoneNumber: row.phoneNumber || '',
        }));
        return NextResponse.json(customer);
    } catch (e: unknown) {
        const message = e instanceof Error ? e.message : String(e);
        return NextResponse.json({ success: false, error: message }, { status: 500 });
    }
}