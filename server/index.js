import "dotenv/config";

import app from "./app.js";

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Telegrams of the Wind server is running on port ${PORT}`);
});
