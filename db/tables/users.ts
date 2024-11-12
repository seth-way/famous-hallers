import { pgTable, serial, varchar } from 'drizzle-orm/pg-core';
import { db } from '../db.ts';
import { genSaltSync, hashSync } from 'bcrypt-ts';
import { eq } from 'drizzle-orm';
// Define the User table schema
export const usersTable = pgTable('User', {
  id: serial('id').primaryKey(),
  email: varchar('email', { length: 64 }),
  password: varchar('password', { length: 64 }),
});
// Functions to interact with the User table
export async function getUser(email: string) {
  return await db.select().from(usersTable).where(eq(usersTable.email, email));
}

export async function createUser(email: string, password: string) {
  const salt = genSaltSync(10);
  const hash = hashSync(password, salt);
  return await db.insert(usersTable).values({ email, password: hash });
}