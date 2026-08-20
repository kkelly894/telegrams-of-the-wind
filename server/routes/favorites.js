import express from "express";

import authenticate from "../middleware/authenticate.js";

import {
  addFavorite,
  getFavoritesByUserId,
  removeFavorite,
} from "../db/queries/favorites.js";

import { getTelegramById } from "../db/queries/telegrams.js";

const router = express.Router();

router.get("/", authenticate, async (req, res) => {
  try {
    const favorites = await getFavoritesByUserId(req.user.id);

    const displayedFavorites = favorites.map((telegram) => ({
      ...telegram,
      sender_name: telegram.is_anonymous ? "Anonymous" : telegram.sender_name,
    }));

    return res.json(displayedFavorites);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Unable to get favorites.",
    });
  }
});

router.post("/:telegramId", authenticate, async (req, res) => {
  try {
    const telegram = await getTelegramById(req.params.telegramId);

    if (!telegram) {
      return res.status(404).json({
        message: "Telegram not found.",
      });
    }

    const favorite = await addFavorite(req.user.id, req.params.telegramId);

    if (!favorite) {
      return res.status(200).json({
        message: "Telegram is already favorited.",
      });
    }

    return res.status(201).json({
      message: "Telegram favorited successfully.",
      favorite,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Unable to favorite telegram.",
    });
  }
});

router.delete("/:telegramId", authenticate, async (req, res) => {
  try {
    const removedFavorite = await removeFavorite(
      req.user.id,
      req.params.telegramId,
    );

    if (!removedFavorite) {
      return res.status(404).json({
        message: "Favorite not found.",
      });
    }

    return res.json({
      message: "Favorite removed successfully.",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Unable to remove favorite.",
    });
  }
});

export default router;
