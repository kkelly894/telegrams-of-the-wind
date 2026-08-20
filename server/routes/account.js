import express from "express";

import authenticate from "../middleware/authenticate.js";

import { getTelegramsByUserId } from "../db/queries/telegrams.js";

const router = express.Router();

router.get("/telegrams", authenticate, async (req, res) => {
  try {
    const telegrams = await getTelegramsByUserId(req.user.id);

    return res.json(telegrams);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Unable to get your telegrams.",
    });
  }
});

export default router;
