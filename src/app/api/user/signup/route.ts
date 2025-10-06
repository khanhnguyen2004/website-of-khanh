import sql from 'mssql';
import { pool } from '../../../../lib/db';
import { NextResponse } from 'next/server';
export async function POST(req: Request) {
    const { username, password, firstName, lastName, email, phoneNumber } = await req.json();
    const connection = await pool;
    const checkUser = await connection.request()
        .input('username', sql.NVarChar(20), username)
        .query(`SELECT * FROM users WHERE username = @username`);
    if (checkUser.recordset.length > 0) {
        return NextResponse.json({ message: "Username already exists." }, { status: 400 });
    }
    const checkEmail = await connection.request()
        .input('email', sql.NVarChar(255), email)
        .query('SELECT * FROM infoUsers WHERE email = @email');
    if (checkEmail.recordset.length > 0) {
        return NextResponse.json({ message: "Email already exists." }, { status: 400 });
    }
    const checkPhoneNumber = await connection.request()
        .input('phoneNumber', sql.NVarChar(10), phoneNumber)
        .query('SELECT * FROM infoUsers WHERE phoneNumber = @phoneNumber');
    if (checkPhoneNumber.recordset.length > 0) {
        return NextResponse.json({ message: "Phone number already exists." }, { status: 400 });
    }
    const resultUser = await connection.request()
        .input('username', sql.NVarChar(20), username)
        .input('password', sql.NVarChar(20), password)
        .query(`INSERT INTO users (username, password) OUTPUT INSERTED.id VALUES (@username, @password)`);
    const userId = resultUser.recordset ? resultUser.recordset[0].id : null;
    await connection.request()
        .input('firstName', sql.NVarChar(30), firstName)
        .input('lastName', sql.NVarChar(30), lastName)
        .input('email', sql.NVarChar(255), email)
        .input('phoneNumber', sql.NVarChar(10), phoneNumber)
        .input('idUser', sql.Int, userId)
        .query(`INSERT INTO infoUsers (firstName, lastName, email, phoneNumber, idUser) VALUES (@firstName, @lastName, @email, @phoneNumber, @idUser)`);
    return NextResponse.json({ message: "User created successfully." }, { status: 201 });
}