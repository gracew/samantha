import { requireSession, RequireSessionProp } from '@clerk/clerk-sdk-node';
import type { NextApiRequest, NextApiResponse } from 'next';
import { client } from './client';

async function handler(
  req: RequireSessionProp<NextApiRequest>,
  res: NextApiResponse
) {
  const authQuery = "select * from persons where user_id = $1";
  const authRes = await client.query(authQuery, [
    req.session.userId,
  ]);
  if (!authRes.rows.find(r => r.id === req.body.person_id)) {
    res.status(403).end();
    return;
  }

  const query = "insert into dates(id, person_id, date, time) values ($1, $2, $3, $4)";
  await client.query(query, [
    req.body.id,
    req.body.person_id,
    req.body.date,
    req.body.time,
  ]);
  res.status(200).end();
}

export default requireSession(handler);
