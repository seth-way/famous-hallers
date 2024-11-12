import { pgEnum  } from 'drizzle-orm/pg-core';

export type ILeagues = 'MLB' | 'NBA' | 'NFL' | 'NHL';
export const leaguesEnum = pgEnum("leagues", ["MLB", "NBA", "NFL", "NHL"]);
