import { api } from '@/gateways';
import { addMessagesToDB } from '@/repository';

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const formatDateStr = (date: Date) => {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, '0');
  const day = `${date.getDate()}`.padStart(2, '0');
  return `${year}-${month}-${day}T00:00:00.000Z`;
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

  console.log(offset);
  await sleep(100);
}
