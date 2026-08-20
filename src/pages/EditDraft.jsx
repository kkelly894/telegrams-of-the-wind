import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router";

import { useAuth } from "../auth/AuthContext";
import { useTelegrams } from "../context/TelegramContext";

export default function EditDraft() {
  const { id } = useParams();

  const navigate = useNavigate();

  const { user } = useAuth();

  const { drafts, updateDraft, sendDraft, deleteDraft } = useTelegrams();

  const [error, setError] = useState(null);

  const draft = drafts.find((draft) => draft.id === Number(id));

  if (!draft) {
    return (
      <section className="create-telegram-page">
        <div className="telegram-form-paper">
          <h1>Draft Not Found</h1>

          <Link to="/drafts">Back to Drafts</Link>
        </div>
      </section>
    );
  }

  if (!user || draft.user_id !== user.id) {
    return (
      <section className="create-telegram-page">
        <div className="telegram-form-paper">
          <h1>Unable to Edit Draft</h1>

          <p>You can only edit drafts that you created.</p>

          <Link to="/drafts">Back to Drafts</Link>
        </div>
      </section>
    );
  }

  const onEditDraft = async (formData) => {
    const recipientName = formData.get("recipient_name");

    const senderName = formData.get("sender_name");

    const message = formData.get("message");

    const isAnonymous = formData.get("is_anonymous") === "on";

    const action = formData.get("action");

    setError(null);

    try {
      if (action === "draft") {
        await updateDraft(draft.id, {
          recipient_name: recipientName,
          sender_name: senderName,
          message,
          is_anonymous: isAnonymous,
        });

        navigate("/drafts");
        return;
      }

      if (action === "delete") {
        await deleteDraft(draft.id);

        navigate("/drafts");
        return;
      }

      if (!recipientName || !senderName || !message) {
        setError("Please fill out all required fields before sending.");

        return;
      }

      const sentTelegram = await sendDraft(draft.id, {
        recipient_name: recipientName,
        sender_name: senderName,
        message,
        is_anonymous: isAnonymous,
      });

      navigate(`/telegrams/${sentTelegram.id}`);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <section className="create-telegram-page">
      <div className="telegram-form-paper">
        <h1>Continue Draft</h1>

        <div className="telegram-form-divider"></div>

        <form className="telegram-form" action={onEditDraft}>
          <label>
            Recipient Name
            <input
              type="text"
              name="recipient_name"
              defaultValue={draft.recipient_name || ""}
            />
          </label>

          <label>
            Sender Name
            <input
              type="text"
              name="sender_name"
              defaultValue={draft.sender_name || ""}
            />
          </label>

          <label>
            Message
            <textarea
              name="message"
              rows="10"
              defaultValue={draft.message || ""}
            ></textarea>
          </label>

          <label className="anonymous-option">
            <input
              type="checkbox"
              name="is_anonymous"
              defaultChecked={draft.is_anonymous}
            />
            Display sender as Anonymous
          </label>

          {error && <output className="telegram-form-error">{error}</output>}

          <div className="telegram-form-actions">
            <button
              className="draft-button"
              type="submit"
              name="action"
              value="draft"
            >
              Save Draft
            </button>

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
              value="delete"
            >
              Delete Draft
            </button>
          </div>
        </form>

        <Link className="cancel-edit-link" to="/drafts">
          Cancel
        </Link>
      </div>
    </section>
  );
}
