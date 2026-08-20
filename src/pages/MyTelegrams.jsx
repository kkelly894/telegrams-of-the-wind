import Envelope from "../components/Envelope";
import { useTelegrams } from "../context/TelegramContext";

export default function MyTelegrams() {
  const { myTelegrams } = useTelegrams();

  return (
    <section className="all-telegrams-page">
      <div className="all-telegrams-header">
        <h1>My Telegrams</h1>

        <p>Telegrams you have created.</p>
      </div>

      {myTelegrams.length === 0 ? (
        <p className="no-telegrams-message">
          You have not created any telegrams yet.
        </p>
      ) : (
        <div className="telegram-grid">
          {myTelegrams.map((telegram) => (
            <Envelope key={telegram.id} telegram={telegram} />
          ))}
        </div>
      )}
    </section>
  );
}
