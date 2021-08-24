import { requireSession, RequireSessionProp } from '@clerk/clerk-sdk-node';
import type { NextApiRequest, NextApiResponse } from 'next';
import { client } from './client';

async function handler(
    req: RequireSessionProp<NextApiRequest>,
    res: NextApiResponse
  ) {
      const query = `SELECT id, emotion, notes
      FROM checkins
      WHERE user_id = $1 AND id = $2`

      const pgRes = await client.query(query, [req.session.userId, req.body.id]);
      res.status(200).json(pgRes.rows.length > 0 ? pgRes.rows[0] : undefined);
  }
  
  export default requireSession(handler);