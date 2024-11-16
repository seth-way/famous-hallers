import { pgEnum  } from 'drizzle-orm/pg-core';

export const leaguesEnum = pgEnum("leagues", ["MLB", "NBA", "NFL", "NHL", 'NCAA']);
