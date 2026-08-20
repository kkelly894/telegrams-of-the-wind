DROP TABLE IF EXISTS favorites;
DROP TABLE IF EXISTS telegrams;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash TEXT NOT NULL
);

CREATE TABLE telegrams (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL
    REFERENCES users(id)
    ON DELETE CASCADE,

  recipient_name VARCHAR(100),
  sender_name VARCHAR(100),
  message TEXT,

  is_anonymous BOOLEAN DEFAULT FALSE,

  status VARCHAR(20) NOT NULL DEFAULT 'sent'
    CHECK (status IN ('draft', 'sent')),

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE favorites (
  user_id INTEGER NOT NULL
    REFERENCES users(id)
    ON DELETE CASCADE,

  telegram_id INTEGER NOT NULL
    REFERENCES telegrams(id)
    ON DELETE CASCADE,

  PRIMARY KEY (user_id, telegram_id)
);