import { Link } from "react-router";

import Envelope from "../components/Envelope";
import { useTelegrams } from "../context/TelegramContext";

export default function Favorites() {
  const { favorites } = useTelegrams();

  return (
    <section className="all-telegrams-page">
      <div className="all-telegrams-header">
        <h1>Favorites</h1>

        <p>Telegrams you have saved with a favorite stamp.</p>
      </div>

      {favorites.length === 0 ? (
        <div className="no-favorites-message">
          <p>You have not favorited any telegrams yet.</p>

          <Link to="/telegrams">View All Telegrams</Link>
        </div>
      ) : (
        <div className="telegram-grid">
          {favorites.map((telegram) => (
            <Envelope key={telegram.id} telegram={telegram} />
          ))}
        </div>
      )}
    </section>
  );
}
