import { NextResponse } from 'next/server';
import { pool } from '@/lib/db';
import sql from 'mssql';

export async function GET(request: Request) {
    try {
        const connection = await pool;
        const result = await connection.request()
            .query(`SELECT u.username, ia.* FROM infoAdmin ia JOIN users u ON ia.idUser=u.id WHERE u.role IN ('admin') ORDER BY ia.id ASC`);
        const employees = result.recordset.map((row: any) => ({
            id: row.id,
            username: row.username || '',
            firstName: row.firstName || '',
            lastName: row.lastName || '',
            email: row.email || '',
            phoneNumber: row.phoneNumber || '',
        }));
        return NextResponse.json(employees);
    } catch (err: any) {
        return NextResponse.json({ success: false, error: err.message }, { status: 500 });
    }
}
