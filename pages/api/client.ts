
import moment from 'moment';
import { Client, types } from 'pg';

types.setTypeParser(types.builtins.NUMERIC, (val: string) => Number(val));
types.setTypeParser(types.builtins.DATE, (val: string) => moment(val).format("YYYY-MM-DD"));
const client = new Client();
if (process.env.NODE_ENV !== "test") {
  client.connect();
}
export { client };
