import { requireSession, RequireSessionProp } from '@clerk/clerk-sdk-node';
import type { NextApiRequest, NextApiResponse } from 'next';
import { client } from './client';

async function handler(
    req: RequireSessionProp<NextApiRequest>,
    res: NextApiResponse
  ) {
    const query = "INSERT INTO questions(user_id, question, type) values ($1, $2, $3)";
    await client.query(query, [
        req.session.userId,
        req.body.question,
        req.body.type,
      ]);
      res.status(200).end();
  }

export default requireSession(handler);