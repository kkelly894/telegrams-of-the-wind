import express from "express";

import { getAllTelegrams, getTelegramById } from "../db/queries/telegrams.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const sort = req.query.sort || "newest";

  if (sort !== "newest" && sort !== "oldest") {
    return res.status(400).json({
      message: "Sort must be newest or oldest.",
    });
  }

  try {
    const telegrams = await getAllTelegrams(sort);

    const displayedTelegrams = telegrams.map((telegram) => ({
      ...telegram,
      sender_name: telegram.is_anonymous ? "Anonymous" : telegram.sender_name,
    }));

    return res.json(displayedTelegrams);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Unable to get telegrams.",
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const telegram = await getTelegramById(req.params.id);

    if (!telegram) {
      return res.status(404).json({
        message: "Telegram not found.",
      });
    }

    const displayedTelegram = {
      ...telegram,
      sender_name: telegram.is_anonymous ? "Anonymous" : telegram.sender_name,
    };

    return res.json(displayedTelegram);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Unable to get telegram.",
    });
  }
});

export default router;
