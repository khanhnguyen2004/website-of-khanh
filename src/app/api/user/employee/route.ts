import { NextResponse } from 'next/server';
import { config } from '@/lib/db';
import { InfoAdmin } from '@/types/users';

export async function GET(request: Request) {
    try {
        const connection = await config;
        const [employee] = await connection.execute(`SELECT u.username, ia.* FROM infoAdmin ia JOIN users u ON ia.idUser=u.id WHERE u.role IN ('admin') ORDER BY ia.id ASC`);

        const employeeResult = employee as InfoAdmin[];
        const employees = employeeResult.map(row => ({
            id: row.id,
            username: row.username || '',
            firstName: row.firstName || '',
            lastName: row.lastName || '',
            email: row.email || '',
            phoneNumber: row.phoneNumber || '',
        }));
        return NextResponse.json(employees);
    } catch (e: unknown) {
        const message = e instanceof Error ? e.message : String(e);
        return NextResponse.json({ success: false, error: message }, { status: 500 });
    }
}
