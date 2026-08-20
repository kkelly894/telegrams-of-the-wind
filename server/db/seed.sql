INSERT INTO users (
  username,
  email,
  password_hash
)
VALUES
  (
    'sunny',
    'sunny@example.com',
    'temporary-password-hash'
  ),
  (
    'jamie',
    'jamie@example.com',
    'temporary-password-hash'
  ),
  (
    'mara',
    'mara@example.com',
    'temporary-password-hash'
  );


INSERT INTO telegrams (
  user_id,
  recipient_name,
  sender_name,
  message,
  is_anonymous,
  status
)
VALUES
  (
    1,
    'Ashton',
    'Sunny',
    'I miss you every day.',
    false,
    'sent'
  ),
  (
    2,
    'Mom',
    'Jamie',
    'I still think about all the things I wish I could tell you.',
    true,
    'sent'
  ),
  (
    3,
    'James',
    'Mara',
    'I hope somehow these words still find you.',
    false,
    'sent'
  ),
  (
    1,
    'Ashton',
    'Sunny',
    'This is an unfinished draft.',
    false,
    'draft'
  );


INSERT INTO favorites (
  user_id,
  telegram_id
)
VALUES
  (1, 2),
  (1, 3),
  (2, 1);