import Envelope from "../components/Envelope";
import { useTelegrams } from "../context/TelegramContext";

export default function AllTelegrams() {
  const { telegrams } = useTelegrams();

  return (
    <section className="all-telegrams-page">
      <div className="all-telegrams-header">
        <h1>All Telegrams</h1>

        <p>Messages carried by love, memory, and the wind.</p>
      </div>

      <div className="telegram-grid">
        {telegrams.map((telegram) => (
          <Envelope key={telegram.id} telegram={telegram} />
        ))}
      </div>
    </section>
  );
}
