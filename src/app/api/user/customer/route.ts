import { NextResponse } from 'next/server';
import { pool } from '@/lib/db';
import sql from 'mssql';

export async function GET(request: Request) {
    try {
        const connection = await pool;
        const result = await connection.request()
            .query(`SELECT u.username, iu.* FROM infoUsers iu JOIN users u ON iu.idUser=u.id WHERE u.role IN ('client') ORDER BY iu.id ASC`);
        const customer = result.recordset.map((row: any) => ({
            id: row.id,
            username: row.username || '',
            firstName: row.firstName || '',
            lastName: row.lastName || '',
            email: row.email || '',
            phoneNumber: row.phoneNumber || '',
        }));
        return NextResponse.json(customer);
    } catch (err: any) {
        return NextResponse.json({ success: false, error: err.message }, { status: 500 });
    }
}