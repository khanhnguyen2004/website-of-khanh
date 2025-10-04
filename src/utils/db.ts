// db.ts (example)
import sql from 'mssql';
import config from '@/utils/dbConfig';

const pool = new sql.ConnectionPool(config)
    .connect()
    .then(pool => {
        console.log('Database Connected!');
        return pool;
    })
    .catch(err => {
        console.error('Database Connection Failed!', err);
        throw err;
    });

export {
    sql,
    pool
};