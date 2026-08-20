import { Link } from "react-router";

import Envelope from "../components/Envelope";
import { useAuth } from "../auth/AuthContext";
import { useTelegrams } from "../context/TelegramContext";

export default function Favorites() {
  const { user } = useAuth();

  const { telegrams, favorites } = useTelegrams();

  const favoriteTelegramIds = favorites
    .filter((favorite) => favorite.user_id === user?.id)
    .map((favorite) => favorite.telegram_id);

  const favoriteTelegrams = telegrams.filter(
    (telegram) =>
      favoriteTelegramIds.includes(telegram.id) && telegram.status !== "draft",
  );

  return (
    <section className="all-telegrams-page">
      <div className="all-telegrams-header">
        <h1>Favorites</h1>

        <p>Telegrams you have saved with a favorite stamp.</p>
      </div>

      {favoriteTelegrams.length === 0 ? (
        <div className="no-favorites-message">
          <p>You have not favorited any telegrams yet.</p>

          <Link to="/telegrams">View All Telegrams</Link>
        </div>
      ) : (
        <div className="telegram-grid">
          {favoriteTelegrams.map((telegram) => (
            <Envelope key={telegram.id} telegram={telegram} />
          ))}
        </div>
      )}
    </section>
  );
}
