import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "@/db/schema";

function resolveDbUrl() {
  return process.env.NETLIFY_DATABASE_URL ?? process.env.DATABASE_URL ?? null;
}

function createDb() {
  const url = resolveDbUrl();
  if (!url) throw new Error("No database URL configured.");
  const connection = postgres(url, {
    prepare: false,
  });

  return drizzle(connection, { schema });
}

type AppDb = ReturnType<typeof createDb>;

const globalForDb = globalThis as {
  receiptsDb?: AppDb;
};

export function getDb() {
  if (!resolveDbUrl()) {
    return null;
  }

  if (!globalForDb.receiptsDb) {
    globalForDb.receiptsDb = createDb();
  }

  return globalForDb.receiptsDb;
}
