import sql from 'mssql';
import { pool } from '../../../../lib/db';
export async function getUserByUsername(username: string, password: string) {
    const connection = await pool;
    const userResult = await connection.request()
        .input('username', sql.NVarChar(20), username)
        .input('password', sql.NVarChar(20), password)
        .query(`SELECT * FROM users WHERE username = @username AND password = @password`);
    if (userResult.recordset.length === 0) {
        return null;
    }
    const user = userResult.recordset[0];
    let userInfo = null;
    if (user.role === 'admin') {
        const adminResult = await connection.request()
            .input('idUser', sql.Int, user.id)
            .query(`SELECT * FROM infoAdmin WHERE idUser = @idUser`)
        userInfo = adminResult.recordset[0] ?? null;
        if (!userInfo) {
            console.log(`No infoAdmin record for user id: ${user.id}`);
        }
    }
    else {
        const userResult = await connection.request()
            .input('idUser', sql.Int, user.id)
            .query(`SELECT * FROM infoUsers WHERE idUser = @idUser`)
        userInfo = userResult.recordset[0] ?? null;
        if (!userInfo) {
            console.log(`No infoUsers record for user id: ${user.id}`);
        }
    }
    if (!userInfo) {
        return null;
    }
    return {
        id: user.id,
        username,
        role: user.role,
        firstName: userInfo.firstName,
        lastName: userInfo.lastName,
        email: userInfo.email,
        phoneNumber: userInfo.phoneNumber
    }
}