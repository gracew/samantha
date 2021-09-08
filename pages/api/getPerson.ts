import { requireSession, RequireSessionProp } from '@clerk/clerk-sdk-node';
import type { NextApiRequest, NextApiResponse } from 'next';
import { client } from './client';

async function handler(
  req: RequireSessionProp<NextApiRequest>,
  res: NextApiResponse
) {
  // https://stackoverflow.com/questions/24155190/postgresql-left-join-json-agg-ignore-remove-null
  const query = `select p.id, p.name, p.context, p.context_other, p.archived,
coalesce(json_agg(dates order by dates.date desc) filter (where dates.id is not null), '[]') as dates
from persons p
left join dates on p.id = dates.person_id
where p.user_id = $1 and p.id = $2
group by p.id`;
  const pgRes = await client.query(query, [req.session.userId, req.body.id]);
  res.status(200).json(pgRes.rows.length > 0 ? pgRes.rows[0] : undefined);
}

export default requireSession(handler);
