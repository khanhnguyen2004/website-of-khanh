// dbConfig.ts (example)
import sql from 'mssql';
const config: sql.config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER as string, // e.g., 'localhost\\SQLEXPRESS' or an IP address
    database: process.env.DB_DATABASE,
    options: {
        encrypt: true, // Use true for Azure SQL Database, false for local SQL Server
        trustServerCertificate: true // Change to false for production
    }
};

export default config;