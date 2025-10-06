import sql from 'mssql';
import { pool } from '../../../../lib/db';
export async function getUserByUsername(username: string, password: string) {
    const connection = await pool;
    const result = await connection.request()
        .input('username', sql.NVarChar(20), username)
        .input('password', sql.NVarChar(20), password)
        .query(`SELECT u.username, i.firstName, i.lastName, i.email, i.phoneNumber FROM users u JOIN infoUsers i ON i.idUser=u.id WHERE username = @username AND u.password = @password`);
    return result.recordset[0] ?? null;
}