import { requireSession, RequireSessionProp } from '@clerk/clerk-sdk-node';
import type { NextApiRequest, NextApiResponse } from 'next';
import { client } from './client';

async function handler(
  req: RequireSessionProp<NextApiRequest>,
  res: NextApiResponse
) {
  const query = `update persons set 
archived = true, 
archived_at = $1, 
archive_reason = $2, 
archive_reason_other = $3
where user_id = $4 and id = $5`;
  await client.query(query, [
    new Date(),
    req.body.reason,
    req.body.reason_other,
    req.session.userId,
    req.body.id,
  ]);
  res.status(200).end();
}

export default requireSession(handler);
