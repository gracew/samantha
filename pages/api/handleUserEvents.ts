import { buffer } from "micro";
import type { NextApiRequest, NextApiResponse } from 'next';
import { Webhook, WebhookRequiredHeaders } from "svix";
import { client } from './client';

// modeled after https://docs.svix.com/receiving/verifying-payloads/how
export const config = {
  api: {
    bodyParser: false,
  },
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  const payload = (await buffer(req)).toString();
  const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET || "");
  let msg: any;
  try {
    msg = wh.verify(payload, req.headers as any as WebhookRequiredHeaders);
  } catch (err) {
    res.status(400).end();
  }

  if (msg.type === "user.created") {
    if (msg.data.phone_numbers.length > 0) {
      await client.query(
        "insert into users(id, first_name, last_name, phone) values ($1, $2, $3, $4)",
        [
          msg.data.id,
          msg.data.first_name,
          msg.data.last_name,
          msg.data.phone_numbers[0].phone_number,
        ]);
    } else if (msg.data.email_addresses.length > 0) {
      await client.query(
        "insert into users(id, first_name, last_name, email) values ($1, $2, $3, $4)",
        [
          msg.data.id,
          msg.data.first_name,
          msg.data.last_name,
          msg.data.email_addresses[0].email_address
        ]);
    }
  }
  res.status(200).end();
}