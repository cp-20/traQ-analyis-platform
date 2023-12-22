import { drizzle } from 'drizzle-orm/bun-sqlite';
import { Database } from 'bun:sqlite';
import { Message } from '@/gateways/api-client';
import * as schema from './schema';

export const sqlite = new Database('db.sqlite', { create: true });
export const db = drizzle(sqlite, { schema });

export const addMessagesToDB = async (messages: Message[]) => {
  const messageValues = messages.map((m) => ({
    ...m,
    pinned: m.pinned ? 1 : 0,
  }));

  const process1 = db
    .insert(schema.messages)
    .values(messageValues)
    .onConflictDoNothing()
    .execute();

  const messageStampsValues = messages.flatMap((m) => {
    if (!m.stamps) return [];
    return m.stamps.map((s) => ({
      ...s,
      messageId: m.id,
    }));
  });

  const process2 = db
    .insert(schema.messageStamps)
    .values(messageStampsValues)
    .onConflictDoNothing()
    .execute();

  await Promise.all([process1, process2]);
};
