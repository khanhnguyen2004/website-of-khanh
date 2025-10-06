import sql from 'mssql';
import { pool } from '../../../../../lib/db';
import { NextResponse } from 'next/server';
export async function PUT(req: Request) {
    const { username, firstName, lastName, email, phoneNumber } = await req.json();
    const connection = await pool;
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
    await connection.request()
        .input('username', sql.NVarChar(20), username)
        .input('firstName', sql.NVarChar(30), firstName)
        .input('lastName', sql.NVarChar(30), lastName)
        .input('email', sql.NVarChar(255), email)
        .input('phoneNumber', sql.NVarChar(10), phoneNumber)
        .query(`UPDATE infoUsers SET firstName=@firstName, lastName=@lastName, email=@email, phoneNumber=@phoneNumber WHERE idUser = (SELECT id FROM users WHERE username = @username)`);
    return NextResponse.json({ message: "Update successful." }, { status: 200 });
}