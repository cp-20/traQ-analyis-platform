import { Api } from './api-client';

const accessToken = process.env.BOT_ACCESS_TOKEN;
if (!accessToken) {
  throw new Error('BOT_ACCESS_TOKEN is not set');
}

export const api = new Api({
  baseApiParams: { headers: { Authorization: `Bearer ${accessToken}` } },
});
