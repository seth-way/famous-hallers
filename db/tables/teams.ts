import { pgTable, pgEnum, serial, varchar } from 'drizzle-orm/pg-core';
import { db } from '../db.ts';
import { genSaltSync, hashSync } from 'bcrypt-ts';
import { eq, and } from 'drizzle-orm';
import { MLBTeamsEnum, NBATeamsEnum, NFLTeamsEnum, NHLTeamsEnum, AnyTeamType } from 'db/constants/teams.ts';
import { leaguesEnum, ILeagues } from 'db/constants/leagues.ts';

// Define the User table schema
export const teamsTable = pgTable('Team', {
  id: serial('id').primaryKey(),
  abbr:  varchar('abbr', { length: 3 }).$type<AnyTeamType>(),
  league: leaguesEnum('league'),
});
// Functions to interact with the User table
export async function getTeam(league: ILeagues , abbr: AnyTeamType) {
  return await db.select().from(teamsTable).where(and(eq(teamsTable.league, league), eq(teamsTable.abbr, abbr)));
}

export async function createUser(email: string, password: string) {
  const salt = genSaltSync(10);
  const hash = hashSync(password, salt);
  return await db.insert(teamsTable).values({ email, password: hash });
}