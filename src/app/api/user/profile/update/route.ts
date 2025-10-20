import sql from 'mssql';
import { config } from '../../../../../lib/db';
import { NextResponse } from 'next/server';
export async function PUT(req: Request) {
    const { username, firstName, lastName, email, phoneNumber } = await req.json();
    const connection = await config;
    // const checkEmail = await connection.request()
    //     .input('email', sql.NVarChar(255), email)
    //     .query('SELECT * FROM infoUsers WHERE email = @email');
    // if (checkEmail.recordset.length > 0) {
    //     return NextResponse.json({ message: "Email already exists." }, { status: 400 });
    // }
    // const checkPhoneNumber = await connection.request()
    //     .input('phoneNumber', sql.NVarChar(10), phoneNumber)
    //     .query('SELECT * FROM infoUsers WHERE phoneNumber = @phoneNumber');
    // if (checkPhoneNumber.recordset.length > 0) {
    //     return NextResponse.json({ message: "Phone number already exists." }, { status: 400 });
    // }
    await connection.execute(`UPDATE infoUsers SET firstName=?, lastName=?, email=?, phoneNumber=? WHERE idUser = (SELECT id FROM users WHERE username = ?)`, [firstName, lastName, email, phoneNumber, username]);

    return NextResponse.json({ message: "Update successful." }, { status: 200 });
}