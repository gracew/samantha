import { requireSession, RequireSessionProp } from '@clerk/clerk-sdk-node';
import type { NextApiRequest, NextApiResponse } from 'next';
import { client } from './client';

async function handler(
  req: RequireSessionProp<NextApiRequest>,
  res: NextApiResponse
) {
  const query = "insert into persons(user_id, name, context, context_other) values ($1, $2, $3, $4) returning id";
  const pgRes = await client.query(query, [
    req.session.userId,
    req.body.name,
    req.body.context,
    req.body.context_other,
  ]);
  res.status(200).json(pgRes.rows);
}

export default requireSession(handler);
