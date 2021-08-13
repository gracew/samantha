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
  const authRes = await client.query(authQuery, [req.body.id]);
  if (!authRes.rows.find(r => r.user_id === req.session.userId)) {
    res.status(403).end();
    return;
  }

  const query = "select * from dates where id = $1";
  const pgRes = await client.query(query, [req.body.id]);
  res.status(200).json(pgRes.rows.length > 0 ? pgRes.rows[0] : undefined);
}

export default requireSession(handler);
