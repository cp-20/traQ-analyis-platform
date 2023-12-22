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
    userIdIndex: index('messages_user_id_idx').on(t.userId),
    channelIdIndex: index('messages_channel_id_idx').on(t.channelId),
    createdAtIndex: index('messages_created_at_idx').on(t.createdAt),
    updatedAtIndex: index('messages_updated_at_idx').on(t.updatedAt),
    pinnedIndex: index('messages_pinned_idx').on(t.pinned),
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
    userIdIndex: index('message_stamps_user_id_idx').on(t.userId),
    stampIdIndex: index('message_stamps_stamp_id_idx').on(t.stampId),
    messageIdIndex: index('message_stamps_message_id_idx').on(t.messageId),
    createdAtIndex: index('message_stamps_created_at_idx').on(t.createdAt),
    updatedAtIndex: index('message_stamps_updated_at_idx').on(t.updatedAt),
  })
);

export const users = sqliteTable(
  'users',
  {
    id: text('id').primaryKey().notNull(),
    name: text('name').notNull(),
    iconFileId: text('icon_file_id').notNull(),
    updatedAt: text('updated_at').notNull(),
  },
  (t) => ({
    nameIndex: index('users_name_idx').on(t.name),
    updatedAtIndex: index('users_updated_at_idx').on(t.updatedAt),
  })
);
