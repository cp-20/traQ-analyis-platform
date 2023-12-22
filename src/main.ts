import { api } from '@/gateways';
import { addMessagesToDB, db } from '@/repository';
import * as schema from '@/repository/schema';
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

{
  const res = await api.users.getUsers({ 'include-suspended': true });
  if (!res.ok) throw new Error('failed to get users');
  const users = res.data;
  db.insert(schema.users).values(users).onConflictDoNothing().execute();
}

const formatDateStr = (date: Date) => {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, '0');
  const day = `${date.getDate()}`.padStart(2, '0');
  const hour = `${date.getHours()}`.padStart(2, '0');
  const minute = `${date.getMinutes()}`.padStart(2, '0');
  const second = `${date.getSeconds()}`.padStart(2, '0');
  return `${year}-${month}-${day}T${hour}:${minute}:${second}.000Z`;
};

let before = formatDateStr(new Date());
let offset = 0;
while (true) {
  const res = await api.messages.searchMessages({
    bot: false,
    sort: 'createdAt',
    limit: 100,
    before,
  });
  if (!res.ok) continue;

  const searched = res.data.hits;
  if (searched.length === 0) break;

  addMessagesToDB(searched);
  offset += searched.length;
  before = searched[searched.length - 1].createdAt;

  console.log(offset, searched[searched.length - 1].createdAt);
  await sleep(100);
}
