import db from "../client.js";

export async function getAllTelegrams(sort = "newest") {
  try {
    let order = "DESC";

    if (sort === "oldest") {
      order = "ASC";
    }

    const result = await db.query(
      `
        SELECT
          id,
          user_id,
          recipient_name,
          sender_name,
          message,
          is_anonymous,
          status,
          created_at
        FROM telegrams
        WHERE status = 'sent'
        ORDER BY created_at ${order};
      `,
    );

    return result.rows;
  } catch (error) {
    throw error;
  }
}

export async function getTelegramById(id) {
  try {
    const result = await db.query(
      `
        SELECT
          id,
          user_id,
          recipient_name,
          sender_name,
          message,
          is_anonymous,
          status,
          created_at
        FROM telegrams
        WHERE id = $1
          AND status = 'sent';
      `,
      [id],
    );

    return result.rows[0];
  } catch (error) {
    throw error;
  }
}
