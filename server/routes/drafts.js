import express from "express";

import authenticate from "../middleware/authenticate.js";

import {
  createDraft,
  deleteDraft,
  getDraftsByUserId,
  sendDraft,
  updateDraft,
} from "../db/queries/telegrams.js";

const router = express.Router();

router.post("/", authenticate, async (req, res) => {
  const { recipient_name, sender_name, message, is_anonymous } = req.body;

  try {
    const draft = await createDraft(
      req.user.id,
      recipient_name || null,
      sender_name || null,
      message || null,
      is_anonymous || false,
    );

    return res.status(201).json(draft);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Unable to save draft.",
    });
  }
});

router.get("/", authenticate, async (req, res) => {
  try {
    const drafts = await getDraftsByUserId(req.user.id);

    return res.json(drafts);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Unable to get drafts.",
    });
  }
});

router.patch("/:id", authenticate, async (req, res) => {
  const { recipient_name, sender_name, message, is_anonymous } = req.body;

  try {
    const draft = await updateDraft(
      req.params.id,
      req.user.id,
      recipient_name || null,
      sender_name || null,
      message || null,
      is_anonymous || false,
    );

    if (!draft) {
      return res.status(404).json({
        message: "Draft not found or you do not have permission to edit it.",
      });
    }

    return res.json(draft);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Unable to update draft.",
    });
  }
});

router.post("/:id/send", authenticate, async (req, res) => {
  const { recipient_name, sender_name, message, is_anonymous } = req.body;

  if (!recipient_name || !sender_name || !message) {
    return res.status(400).json({
      message:
        "Recipient name, sender name, and message are required before sending.",
    });
  }

  try {
    const telegram = await sendDraft(
      req.params.id,
      req.user.id,
      recipient_name,
      sender_name,
      message,
      is_anonymous || false,
    );

    if (!telegram) {
      return res.status(404).json({
        message: "Draft not found or you do not have permission to send it.",
      });
    }

    return res.json(telegram);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Unable to send draft.",
    });
  }
});

router.delete("/:id", authenticate, async (req, res) => {
  try {
    const deletedDraft = await deleteDraft(req.params.id, req.user.id);

    if (!deletedDraft) {
      return res.status(404).json({
        message: "Draft not found or you do not have permission to delete it.",
      });
    }

    return res.json({
      message: "Draft deleted successfully.",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Unable to delete draft.",
    });
  }
});

export default router;
