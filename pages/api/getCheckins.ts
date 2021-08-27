import { requireSession, RequireSessionProp } from '@clerk/clerk-sdk-node';
import type { NextApiRequest, NextApiResponse } from 'next';
import { client } from './client';

async function handler(
    req: RequireSessionProp<NextApiRequest>,
    res: NextApiResponse
  ) {
      const query = `SELECT * FROM checkins WHERE user_id = $1`

      const pgRes = await client.query(query, [req.session.userId]);
      res.status(200).json(pgRes.rows);
  }
  
  export default requireSession(handler);