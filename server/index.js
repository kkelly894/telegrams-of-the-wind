import "dotenv/config";

import cors from "cors";
import express from "express";

import accountRouter from "./routes/account.js";
import authRouter from "./routes/auth.js";
import draftRouter from "./routes/drafts.js";
import favoriteRouter from "./routes/favorites.js";
import telegramRouter from "./routes/telegrams.js";

const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRouter);

app.use("/api/telegrams", telegramRouter);

app.use("/api/account", accountRouter);

app.use("/api/drafts", draftRouter);

app.use("/api/favorites", favoriteRouter);

app.get("/", (req, res) => {
  res.json({
    message: "Telegrams of the Wind API",
  });
});

app.listen(PORT, () => {
  console.log(`Telegrams of the Wind server is running on port ${PORT}`);
});
