import client from "./db";

export async function checkTableExists(table: string): Promise<boolean> {
    const result = await client`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = '${table}'
      );`;
  
    return result[0].exists;
  }