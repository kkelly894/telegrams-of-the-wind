import db from "../client.js";

export async function createUser(username, email, passwordHash) {
  try {
    const result = await db.query(
      `
        INSERT INTO users (
          username,
          email,
          password_hash
        )
        VALUES ($1, $2, $3)
        RETURNING id, username, email;
      `,
      [username, email, passwordHash],
    );

    return result.rows[0];
  } catch (error) {
    throw error;
  }
}

export async function getUserByEmail(email) {
  try {
    const result = await db.query(
      `
        SELECT *
        FROM users
        WHERE email = $1;
      `,
      [email],
    );

    return result.rows[0];
  } catch (error) {
    throw error;
  }
}

export async function getUserByUsername(username) {
  try {
    const result = await db.query(
      `
        SELECT *
        FROM users
        WHERE username = $1;
      `,
      [username],
    );

    return result.rows[0];
  } catch (error) {
    throw error;
  }
}

export async function getUserById(id) {
  try {
    const result = await db.query(
      `
        SELECT
          id,
          username,
          email
        FROM users
        WHERE id = $1;
      `,
      [id],
    );

    return result.rows[0];
  } catch (error) {
    throw error;
  }
}
