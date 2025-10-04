// pages/api/users.ts (example with Pages Router)
import { NextApiRequest, NextApiResponse } from 'next';
import { sql, pool } from '@/utils/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        try {
            const request = (await pool).request();
            const result = await request.query('SELECT * FROM users');
            res.status(200).json(result.recordset);
        } catch (err: any) {
            res.status(500).json({ error: err.message });
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}