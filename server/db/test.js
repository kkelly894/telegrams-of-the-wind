import db from "./client.js";

async function testDatabase() {
  try {
    const result = await db.query("SELECT * FROM users;");

    console.log("Database connection successful.");
    console.log(result.rows);
  } catch (error) {
    console.error("Database connection failed:", error.message);
  } finally {
    await db.end();
  }
}

testDatabase();
