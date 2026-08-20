import pg from "pg";

const { Pool } = pg;

const connectionString = process.env.NETLIFY_DB_URL || process.env.DATABASE_URL;

const db = new Pool({
  connectionString,
});

export default db;
