import { config } from '../../../../lib/db';
import { NextResponse } from 'next/server';
import { InfoUsers, Users } from '@/types/users';
export async function POST(req: Request) {
    const { username, password, firstName, lastName, email, phoneNumber } = await req.json();
    const connection = await config;
    const [checkUser] = await connection.execute(`SELECT * FROM users WHERE username = ?`, [username]);

    const checkUserResult = checkUser as Users[];
    if (checkUserResult.length > 0) {
        return NextResponse.json({ message: "Username already exists." }, { status: 400 });
    }
    const [checkEmail] = await connection.execute('SELECT * FROM infoUsers WHERE email = ?', [email]);

    const checkEmailResult = checkEmail as InfoUsers[];
    if (checkEmailResult.length > 0) {
        return NextResponse.json({ message: "Email already exists." }, { status: 400 });
    }
    const [checkPhoneNumber] = await connection.execute('SELECT * FROM infoUsers WHERE phoneNumber = ?', [phoneNumber]);

    const checkPhoneNumberResult = checkPhoneNumber as InfoUsers[];
    if (checkPhoneNumberResult.length > 0) {
        return NextResponse.json({ message: "Phone number already exists." }, { status: 400 });
    }
    const [users] = await connection.execute(`INSERT INTO users (username, password) VALUES (?, ?)`, [username, password]);
    const { insertId: userId } = users as { insertId: number };
    await connection.execute(`INSERT INTO infoUsers (firstName, lastName, email, phoneNumber, idUser) VALUES (?, ?, ?, ?, ?)`, [firstName, lastName, email, phoneNumber, userId]);

    return NextResponse.json({ message: "User created successfully." }, { status: 201 });
}