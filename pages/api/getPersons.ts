import { requireSession, RequireSessionProp } from '@clerk/clerk-sdk-node';
import type { NextApiRequest, NextApiResponse } from 'next';
import { client } from './client';

async function handler(
  req: RequireSessionProp<NextApiRequest>,
  res: NextApiResponse
) {
  const query = `select p.id, p.name, json_agg(dates) as dates 
from persons p
join dates on p.id = dates.person_id
where p.user_id = $1
group by p.id`;
  const pgRes = await client.query(query, [req.session.userId]);
  res.status(200).json(pgRes.rows);
}

export default requireSession(handler);
