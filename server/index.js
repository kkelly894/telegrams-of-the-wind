import "dotenv/config";

import cors from "cors";
import express from "express";

import authRouter from "./routes/auth.js";

const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRouter);

app.get("/", (req, res) => {
  res.json({
    message: "Telegrams of the Wind API",
  });
});

app.listen(PORT, () => {
  console.log(`Telegrams of the Wind server is running on port ${PORT}`);
});
