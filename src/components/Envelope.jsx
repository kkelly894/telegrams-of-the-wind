import { Link } from "react-router";

import { useAuth } from "../auth/AuthContext";
import { useTelegrams } from "../context/TelegramContext";

export default function Envelope({ telegram }) {
  const { user } = useAuth();

  const { isFavorite, toggleFavorite } = useTelegrams();

  const senderName = telegram.is_anonymous ? "Anonymous" : telegram.sender_name;

  const createdDate = new Date(telegram.created_at).toLocaleDateString();

  const favorite = isFavorite(telegram.id);

  const handleFavorite = async () => {
    try {
      await toggleFavorite(telegram.id);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="envelope-container">
      <Link className="envelope-link" to={`/telegrams/${telegram.id}`}>
        <article className="envelope">
          <div className="envelope-recipient">
            <p>To:</p>

            <h2>{telegram.recipient_name}</h2>
          </div>

          <div className="envelope-sender">
            <p>From:</p>

            <p>{senderName}</p>
          </div>

          <p className="envelope-date">{createdDate}</p>
        </article>
      </Link>

      {user && (
        <button
          className={
            favorite
              ? "favorite-button favorite-button-active"
              : "favorite-button"
          }
          type="button"
          onClick={handleFavorite}
        >
          {favorite ? "FAVORITE" : "ADD STAMP"}
        </button>
      )}

      {favorite && <div className="favorite-stamp">FAVORITE</div>}
    </div>
  );
}
