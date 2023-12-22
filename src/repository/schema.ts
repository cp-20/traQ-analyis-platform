import {
  text,
  integer,
  sqliteTable,
  primaryKey,
  index,
} from 'drizzle-orm/sqlite-core';

export const messages = sqliteTable(
  'messages',
  {
    id: text('id').primaryKey().notNull(),
    userId: text('user_id').notNull(),
    channelId: text('channel_id').notNull(),
    content: text('content').notNull(),
    createdAt: text('created_at').notNull(),
    updatedAt: text('updated_at').notNull(),
    pinned: integer('pinned').notNull(),
  },
  (t) => ({
    userIdIndex: index('user_id_index').on(t.userId),
    channelIdIndex: index('channel_id_index').on(t.channelId),
    createdAtIndex: index('created_at_index').on(t.createdAt),
    updatedAtIndex: index('updated_at_index').on(t.updatedAt),
    pinnedIndex: index('pinned_index').on(t.pinned),
  })
);

export const messageStamps = sqliteTable(
  'message_stamps',
  {
    userId: text('user_id').notNull(),
    stampId: text('stamp_id').notNull(),
    messageId: text('message_id')
      .notNull()
      .references(() => messages.id),
    count: integer('count').notNull(),
    createdAt: text('created_at').notNull(),
    updatedAt: text('updated_at').notNull(),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.userId, t.stampId] }),
    userIdIndex: index('user_id_idx').on(t.userId),
    stampIdIndex: index('stamp_id_idx').on(t.stampId),
    messageIdIndex: index('message_id_idx').on(t.messageId),
    createdAtIndex: index('created_at_idx').on(t.createdAt),
    updatedAtIndex: index('updated_at_idx').on(t.updatedAt),
  })
);
