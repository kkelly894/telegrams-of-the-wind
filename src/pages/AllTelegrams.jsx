import { mockTelegrams } from "../data/mockTelegrams";
import Envelope from "../components/Envelope";

export default function AllTelegrams() {
  return (
    <section className="all-telegrams-page">
      <div className="all-telegrams-header">
        <h1>All Telegrams</h1>

        <p>Messages carried by love, memory, and the wind.</p>
      </div>

      <div className="telegram-grid">
        {mockTelegrams.map((telegram) => (
          <Envelope key={telegram.id} telegram={telegram} />
        ))}
      </div>
    </section>
  );
}
