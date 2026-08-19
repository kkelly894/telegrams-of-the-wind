import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router";

import { useAuth } from "../auth/AuthContext";
import { useTelegrams } from "../context/TelegramContext";

export default function EditTelegram() {
  const { id } = useParams();

  const navigate = useNavigate();

  const { user } = useAuth();

  const { telegrams, updateTelegram } = useTelegrams();

  const [error, setError] = useState(null);

  const telegram = telegrams.find((telegram) => telegram.id === Number(id));

  if (!telegram) {
    return (
      <section className="create-telegram-page">
        <div className="telegram-form-paper">
          <h1>Telegram Not Found</h1>

          <Link to="/telegrams">Back to All Telegrams</Link>
        </div>
      </section>
    );
  }

  if (!user || telegram.user_id !== user.id) {
    return (
      <section className="create-telegram-page">
        <div className="telegram-form-paper">
          <h1>Unable to Edit Telegram</h1>

          <p>You can only edit telegrams that you created.</p>

          <Link to={`/telegrams/${telegram.id}`}>Back to Telegram</Link>
        </div>
      </section>
    );
  }

  const onEditTelegram = async (formData) => {
    const recipientName = formData.get("recipient_name");

    const message = formData.get("message");

    const isAnonymous = formData.get("is_anonymous") === "on";

    setError(null);

    if (!recipientName || !message) {
      setError("Please fill out all required fields.");

      return;
    }

    try {
      const updatedTelegram = updateTelegram(telegram.id, {
        recipient_name: recipientName,
        message,
        is_anonymous: isAnonymous,
      });

      navigate(`/telegrams/${updatedTelegram.id}`);
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <section className="create-telegram-page">
      <div className="telegram-form-paper">
        <h1>Edit Telegram</h1>

        <div className="telegram-form-divider"></div>

        <form className="telegram-form" action={onEditTelegram}>
          <label>
            Recipient Name
            <input
              type="text"
              name="recipient_name"
              defaultValue={telegram.recipient_name}
              required
            />
          </label>

          <label>
            Message
            <textarea
              name="message"
              rows="10"
              defaultValue={telegram.message}
              required
            ></textarea>
          </label>

          <label className="anonymous-option">
            <input
              type="checkbox"
              name="is_anonymous"
              defaultChecked={telegram.is_anonymous}
            />
            Display sender as Anonymous
          </label>

          {error && <output className="telegram-form-error">{error}</output>}

          <button className="telegram-form-button" type="submit">
            Save Changes
          </button>
        </form>

        <Link className="cancel-edit-link" to={`/telegrams/${telegram.id}`}>
          Cancel
        </Link>
      </div>
    </section>
  );
}
