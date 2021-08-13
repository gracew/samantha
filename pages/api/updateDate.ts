import { requireSession, RequireSessionProp } from '@clerk/clerk-sdk-node';
import type { NextApiRequest, NextApiResponse } from 'next';
import { client } from './client';

async function handler(
  req: RequireSessionProp<NextApiRequest>,
  res: NextApiResponse
) {
  const authQuery = `select user_id from dates 
  left join persons on dates.person_id = persons.id 
  left join users on persons.user_id = users.id 
  where dates.id = $1`;
  const pgRes = await client.query(authQuery, [req.body.id]);
  if (!pgRes.rows.find(r => r.user_id === req.session.userId)) {
    res.status(403).end();
    return;
  }

  const query = "update dates set location = coalesce($1, location), reflection = reflection || $2 where id = $3";
  await client.query(query, [
    req.body.location,
    req.body.reflection,
    req.body.id,
  ]);
  res.status(200).end();
}

export default requireSession(handler);
