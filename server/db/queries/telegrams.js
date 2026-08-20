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

export async function createTelegram(
  userId,
  recipientName,
  senderName,
  message,
  isAnonymous,
) {
  try {
    const result = await db.query(
      `
        INSERT INTO telegrams (
          user_id,
          recipient_name,
          sender_name,
          message,
          is_anonymous,
          status
        )
        VALUES ($1, $2, $3, $4, $5, 'sent')
        RETURNING
          id,
          user_id,
          recipient_name,
          sender_name,
          message,
          is_anonymous,
          status,
          created_at;
      `,
      [userId, recipientName, senderName, message, isAnonymous],
    );

    return result.rows[0];
  } catch (error) {
    throw error;
  }
}

export async function updateTelegram(
  id,
  userId,
  recipientName,
  message,
  isAnonymous,
) {
  try {
    const result = await db.query(
      `
        UPDATE telegrams
        SET
          recipient_name = $1,
          message = $2,
          is_anonymous = $3
        WHERE id = $4
          AND user_id = $5
          AND status = 'sent'
        RETURNING
          id,
          user_id,
          recipient_name,
          sender_name,
          message,
          is_anonymous,
          status,
          created_at;
      `,
      [recipientName, message, isAnonymous, id, userId],
    );

    return result.rows[0];
  } catch (error) {
    throw error;
  }
}

export async function deleteTelegram(id, userId) {
  try {
    const result = await db.query(
      `
        DELETE FROM telegrams
        WHERE id = $1
          AND user_id = $2
          AND status = 'sent'
        RETURNING id;
      `,
      [id, userId],
    );

    return result.rows[0];
  } catch (error) {
    throw error;
  }
}

export async function getTelegramsByUserId(userId) {
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
        WHERE user_id = $1
          AND status = 'sent'
        ORDER BY created_at DESC;
      `,
      [userId],
    );

    return result.rows;
  } catch (error) {
    throw error;
  }
}

export async function createDraft(
  userId,
  recipientName,
  senderName,
  message,
  isAnonymous,
) {
  try {
    const result = await db.query(
      `
        INSERT INTO telegrams (
          user_id,
          recipient_name,
          sender_name,
          message,
          is_anonymous,
          status
        )
        VALUES ($1, $2, $3, $4, $5, 'draft')
        RETURNING
          id,
          user_id,
          recipient_name,
          sender_name,
          message,
          is_anonymous,
          status,
          created_at;
      `,
      [userId, recipientName, senderName, message, isAnonymous],
    );

    return result.rows[0];
  } catch (error) {
    throw error;
  }
}

export async function getDraftsByUserId(userId) {
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
        WHERE user_id = $1
          AND status = 'draft'
        ORDER BY created_at DESC;
      `,
      [userId],
    );

    return result.rows;
  } catch (error) {
    throw error;
  }
}

export async function updateDraft(
  id,
  userId,
  recipientName,
  senderName,
  message,
  isAnonymous,
) {
  try {
    const result = await db.query(
      `
        UPDATE telegrams
        SET
          recipient_name = $1,
          sender_name = $2,
          message = $3,
          is_anonymous = $4
        WHERE id = $5
          AND user_id = $6
          AND status = 'draft'
        RETURNING
          id,
          user_id,
          recipient_name,
          sender_name,
          message,
          is_anonymous,
          status,
          created_at;
      `,
      [recipientName, senderName, message, isAnonymous, id, userId],
    );

    return result.rows[0];
  } catch (error) {
    throw error;
  }
}

export async function sendDraft(
  id,
  userId,
  recipientName,
  senderName,
  message,
  isAnonymous,
) {
  try {
    const result = await db.query(
      `
        UPDATE telegrams
        SET
          recipient_name = $1,
          sender_name = $2,
          message = $3,
          is_anonymous = $4,
          status = 'sent',
          created_at = CURRENT_TIMESTAMP
        WHERE id = $5
          AND user_id = $6
          AND status = 'draft'
        RETURNING
          id,
          user_id,
          recipient_name,
          sender_name,
          message,
          is_anonymous,
          status,
          created_at;
      `,
      [recipientName, senderName, message, isAnonymous, id, userId],
    );

    return result.rows[0];
  } catch (error) {
    throw error;
  }
}

export async function deleteDraft(id, userId) {
  try {
    const result = await db.query(
      `
        DELETE FROM telegrams
        WHERE id = $1
          AND user_id = $2
          AND status = 'draft'
        RETURNING id;
      `,
      [id, userId],
    );

    return result.rows[0];
  } catch (error) {
    throw error;
  }
}
