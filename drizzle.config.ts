import type { Config } from 'drizzle-kit';

export default {
  schema: './src/repository/schema.ts',
  out: './drizzle',
  dbCredentials: {
    url: 'db.sqlite',
  },
  driver: 'better-sqlite',
} satisfies Config;
