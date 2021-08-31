import { requireSession, RequireSessionProp } from '@clerk/clerk-sdk-node';
import type { NextApiRequest, NextApiResponse } from 'next';
import { client } from './client';

async function handler(
    req: RequireSessionProp<NextApiRequest>,
    res: NextApiResponse
  ) {
    if (req.body.includeArchived) {
      const query = `SELECT * FROM questions WHERE user_id = $1`;
      const pgRes = await client.query(query, [req.session.userId]);
      res.status(200).json(pgRes.rows);
    } else {
      const query = `SELECT * FROM questions WHERE user_id = $1 and archived = false`;
      const pgRes = await client.query(query, [req.session.userId]);
      res.status(200).json(pgRes.rows);
    }
  }
  
  export default requireSession(handler);