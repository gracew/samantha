import { requireSession, RequireSessionProp } from '@clerk/clerk-sdk-node';
import type { NextApiRequest, NextApiResponse } from 'next';
import { client } from './client';

async function handler(
  req: RequireSessionProp<NextApiRequest>,
  res: NextApiResponse
) {
  // https://stackoverflow.com/questions/24155190/postgresql-left-join-json-agg-ignore-remove-null
  const query = `select p.id, p.name, 
coalesce(json_agg(dates order by dates.date desc) filter (where dates.id is not null), '[]') as dates
from persons p
left join dates on p.id = dates.person_id
where p.user_id = $1
group by p.id
order by max(dates.date) desc nulls last`;
  const pgRes = await client.query(query, [req.session.userId]);
  res.status(200).json(pgRes.rows);
}

export default requireSession(handler);
