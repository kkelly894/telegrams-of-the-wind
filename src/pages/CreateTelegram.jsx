import { useState } from "react";
import { useNavigate } from "react-router";

import { useTelegrams } from "../context/TelegramContext";

export default function CreateTelegram() {
  const navigate = useNavigate();

  const { createTelegram, saveDraft } = useTelegrams();

  const [error, setError] = useState(null);

  const onCreateTelegram = async (formData) => {
    const recipientName = formData.get("recipient_name");
    const senderName = formData.get("sender_name");
    const message = formData.get("message");
    const isAnonymous = formData.get("is_anonymous") === "on";

    const action = formData.get("action");

    setError(null);

    if (action === "send") {
      if (!recipientName || !senderName || !message) {
        setError("Please fill out all required fields.");
        return;
      }
    }

    try {
      if (action === "draft") {
        saveDraft({
          recipient_name: recipientName,
          sender_name: senderName,
          message,
          is_anonymous: isAnonymous,
        });

        navigate("/drafts");
        return;
      }

      const newTelegram = createTelegram({
        recipient_name: recipientName,
        sender_name: senderName,
        message,
        is_anonymous: isAnonymous,
      });

      navigate(`/telegrams/${newTelegram.id}`);
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <section className="create-telegram-page">
      <div className="telegram-form-paper">
        <h1>Create New Telegram</h1>

        <div className="telegram-form-divider"></div>

        <form className="telegram-form" action={onCreateTelegram}>
          <label>
            Recipient Name
            <input type="text" name="recipient_name" />
          </label>

          <label>
            Sender Name
            <input type="text" name="sender_name" />
          </label>

          <label>
            Message
            <textarea name="message" rows="10"></textarea>
          </label>

          <label className="anonymous-option">
            <input type="checkbox" name="is_anonymous" />
            Display sender as Anonymous
          </label>

          {error && <output className="telegram-form-error">{error}</output>}

          <div className="telegram-form-actions">
            <button
              className="telegram-form-button"
              type="submit"
              name="action"
              value="send"
            >
              Send Telegram
            </button>

            <button
              className="draft-button"
              type="submit"
              name="action"
              value="draft"
            >
              Save Draft
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
