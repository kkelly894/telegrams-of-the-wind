import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router";

import { useAuth } from "../auth/AuthContext";
import { useTelegrams } from "../context/TelegramContext";

export default function TelegramDetails() {
  const { id } = useParams();

  const navigate = useNavigate();

  const { user } = useAuth();

  const { telegrams, deleteTelegram } = useTelegrams();

  const [error, setError] = useState(null);

  const telegram = telegrams.find((telegram) => telegram.id === Number(id));

  if (!telegram) {
    return (
      <section className="telegram-details-page">
        <div className="telegram-paper">
          <h1>Telegram Not Found</h1>

          <Link to="/telegrams">Return to All Telegrams</Link>
        </div>
      </section>
    );
  }

  const senderName = telegram.is_anonymous ? "Anonymous" : telegram.sender_name;

  const createdDate = new Date(telegram.created_at).toLocaleDateString();

  const isOwner = user && user.id === telegram.user_id;

  const handleDelete = async () => {
    setError(null);

    try {
      await deleteTelegram(telegram.id);

      navigate("/account/telegrams");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <section className="telegram-details-page">
      <article className="telegram-paper">
        <div className="telegram-details-header">
          <p>To:</p>

          <h1>{telegram.recipient_name}</h1>
        </div>

        <div className="telegram-message">
          <p>{telegram.message}</p>
        </div>

        <div className="telegram-details-footer">
          <div>
            <p>From:</p>

            <p>{senderName}</p>
          </div>

          <p>{createdDate}</p>
        </div>

        {error && <output className="telegram-form-error">{error}</output>}

        <div className="telegram-details-actions">
          <Link className="back-to-telegrams" to="/telegrams">
            Back to All Telegrams
          </Link>

          {isOwner && (
            <div className="owner-actions">
              <Link
                className="edit-telegram-link"
                to={`/telegrams/${telegram.id}/edit`}
              >
                Edit Telegram
              </Link>

              <button
                className="delete-telegram-button"
                type="button"
                onClick={handleDelete}
              >
                Delete Telegram
              </button>
            </div>
          )}
        </div>
      </article>
    </section>
  );
}
