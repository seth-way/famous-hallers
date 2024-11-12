import { pgTable, serial, varchar } from 'drizzle-orm/pg-core';
import { db } from '../db.ts';
import { eq, and } from 'drizzle-orm';
import { leaguesEnum, ILeagues } from 'db/constants/leagues.ts';

// Define the User table schema
export const teamsTable = pgTable('Team', {
  id: serial('id').primaryKey(),
  abbr:  varchar('abbr', { length: 3 }),
  league: leaguesEnum('league'),
  location: varchar('location', {length: 48}),
  mascot: varchar('mascot', { length: 48 }),
  logo: varchar('mascot', { length: 64 }),
});
// Functions to interact with the User table
export async function getTeam(league: ILeagues , abbr: string) {
  return await db.select().from(teamsTable).where(and(eq(teamsTable.league, league), eq(teamsTable.abbr, abbr)));
}

export async function createTeam(league: ILeagues, abbr: string, location: string, mascot: string, logo: string) {
  return await db.insert(teamsTable).values({
    league, abbr, location, mascot, logo
  });
}
