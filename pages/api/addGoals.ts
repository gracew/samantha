import { requireSession, RequireSessionProp } from '@clerk/clerk-sdk-node';
import type { NextApiRequest, NextApiResponse } from 'next';
import { client } from './client';

async function handler(
  req: RequireSessionProp<NextApiRequest>,
  res: NextApiResponse
) {
  const query = "insert into goals(user_id, goals, goal_other, importance) values ($1, $2, $3, $4)";
  console.log(req.body.goals);
  await client.query(query, [
    req.session.userId,
    JSON.stringify(req.body.goals), // https://github.com/brianc/node-postgres/issues/442#issuecomment-24496481
    req.body.goal_other,
    req.body.importance,
  ]);
  res.status(200).end();
}

export default requireSession(handler);
