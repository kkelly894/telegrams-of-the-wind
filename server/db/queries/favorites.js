import db from "../client.js";

export async function addFavorite(userId, telegramId) {
  try {
    const result = await db.query(
      `
        INSERT INTO favorites (
          user_id,
          telegram_id
        )
        VALUES ($1, $2)
        ON CONFLICT (user_id, telegram_id)
        DO NOTHING
        RETURNING
          user_id,
          telegram_id;
      `,
      [userId, telegramId],
    );

    return result.rows[0];
  } catch (error) {
    throw error;
  }
}

export async function removeFavorite(userId, telegramId) {
  try {
    const result = await db.query(
      `
        DELETE FROM favorites
        WHERE user_id = $1
          AND telegram_id = $2
        RETURNING
          user_id,
          telegram_id;
      `,
      [userId, telegramId],
    );

    return result.rows[0];
  } catch (error) {
    throw error;
  }
}

export async function getFavoritesByUserId(userId) {
  try {
    const result = await db.query(
      `
        SELECT
          telegrams.id,
          telegrams.user_id,
          telegrams.recipient_name,
          telegrams.sender_name,
          telegrams.message,
          telegrams.is_anonymous,
          telegrams.status,
          telegrams.created_at
        FROM favorites
        JOIN telegrams
          ON favorites.telegram_id = telegrams.id
        WHERE favorites.user_id = $1
          AND telegrams.status = 'sent'
        ORDER BY telegrams.created_at DESC;
      `,
      [userId],
    );

    return result.rows;
  } catch (error) {
    throw error;
  }
}
