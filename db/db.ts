import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { ENV } from "@/env";

const client = postgres(`${ENV.POSTGRES_URL!}?sslmode=require`);
export const db = drizzle(client);
export default client;
