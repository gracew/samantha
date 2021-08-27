import { requireSession, RequireSessionProp } from '@clerk/clerk-sdk-node';
import type { NextApiRequest, NextApiResponse } from 'next';
import { client } from './client';

async function handler(
  req: RequireSessionProp<NextApiRequest>,
  res: NextApiResponse
) {
  const query = `update questions set archived = true where user_id = $1 and id = $2`;
  await client.query(query, [req.session.userId, req.body.id]);
  res.status(200).end();
}

export default requireSession(handler);
