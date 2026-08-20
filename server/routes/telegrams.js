import express from "express";

import authenticate from "../middleware/authenticate.js";

import {
  createTelegram,
  deleteTelegram,
  getAllTelegrams,
  getTelegramById,
  updateTelegram,
} from "../db/queries/telegrams.js";

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

router.post("/", authenticate, async (req, res) => {
  const { recipient_name, sender_name, message, is_anonymous } = req.body;

  if (!recipient_name || !sender_name || !message) {
    return res.status(400).json({
      message: "Recipient name, sender name, and message are required.",
    });
  }

  try {
    const telegram = await createTelegram(
      req.user.id,
      recipient_name,
      sender_name,
      message,
      is_anonymous || false,
    );

    return res.status(201).json(telegram);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Unable to create telegram.",
    });
  }
});

router.patch("/:id", authenticate, async (req, res) => {
  const { recipient_name, message, is_anonymous } = req.body;

  if (!recipient_name || !message) {
    return res.status(400).json({
      message: "Recipient name and message are required.",
    });
  }

  try {
    const updatedTelegram = await updateTelegram(
      req.params.id,
      req.user.id,
      recipient_name,
      message,
      is_anonymous || false,
    );

    if (!updatedTelegram) {
      return res.status(404).json({
        message: "Telegram not found or you do not have permission to edit it.",
      });
    }

    return res.json(updatedTelegram);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Unable to update telegram.",
    });
  }
});

router.delete("/:id", authenticate, async (req, res) => {
  try {
    const deletedTelegram = await deleteTelegram(req.params.id, req.user.id);

    if (!deletedTelegram) {
      return res.status(404).json({
        message:
          "Telegram not found or you do not have permission to delete it.",
      });
    }

    return res.json({
      message: "Telegram deleted successfully.",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Unable to delete telegram.",
    });
  }
});

export default router;
