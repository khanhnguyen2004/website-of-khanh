import config from '../dbConfig';
import { InfoAdmin, InfoUsers, Users } from '@/types/users';
export async function getUserByUsername(username: string, password: string) {
    const connection = await config;
    const [users] = await connection.execute(`SELECT * FROM users WHERE username = ? AND password = ?`, [username, password]);
    const userResult = users as Users[];
    if (userResult.length === 0) {

        return null;
    }
    const user = userResult[0];
    let userInfo = null;
    if (user.role === 'admin') {
        const [adminsInfo] = await connection.execute(`SELECT * FROM infoAdmin WHERE idUser = ?`, [user.id]);
        const adminResult = adminsInfo as InfoAdmin[];
        userInfo = adminResult[0] ?? null;
        if (!userInfo) {
            console.log(`No infoAdmin record for user id: ${user.id}`);
        }
    }
    else {
        const [usersInfo] = await connection.execute(`SELECT * FROM infoUsers WHERE idUser = ?`, [user.id])
        const userInfoResult = usersInfo as InfoUsers[];
        userInfo = userInfoResult[0] ?? null;
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