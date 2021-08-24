import { requireSession, RequireSessionProp } from '@clerk/clerk-sdk-node';
import type { NextApiRequest, NextApiResponse } from 'next';
import { client } from './client';

async function handler(
    req: RequireSessionProp<NextApiRequest>,
    res: NextApiResponse
  ) {
    const query = "INSERT INTO checkins(user_id, emotion, notes) values ($1, $2, $3)";
    await client.query(query, [
        req.session.userId,
        req.body.emotion,
        req.body.notes,
      ]);
      res.status(200).end();
  }

export default requireSession(handler);