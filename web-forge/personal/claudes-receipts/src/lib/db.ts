import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "@/db/schema";

function createDb() {
  const connection = postgres(process.env.DATABASE_URL!, {
    prepare: false,
  });

  return drizzle(connection, { schema });
}

type AppDb = ReturnType<typeof createDb>;

const globalForDb = globalThis as {
  receiptsDb?: AppDb;
};

export function getDb() {
  if (!process.env.DATABASE_URL) {
    return null;
  }

  if (!globalForDb.receiptsDb) {
    globalForDb.receiptsDb = createDb();
  }

  return globalForDb.receiptsDb;
}
