import { requireSession, RequireSessionProp } from '@clerk/clerk-sdk-node';
import type { NextApiRequest, NextApiResponse } from 'next';
import { client } from './client';

async function handler(
  req: RequireSessionProp<NextApiRequest>,
  res: NextApiResponse
) {
  const query = "insert into persons(id, user_id, name, context, context_other) values ($1, $2, $3, $4, $5)";
  await client.query(query, [
    req.body.id,
    req.session.userId,
    req.body.name,
    req.body.context,
    req.body.context_other,
  ]);
  res.status(200).end();
}

export default requireSession(handler);
