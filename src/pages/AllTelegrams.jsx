import { useEffect, useState } from "react";

import Envelope from "../components/Envelope";
import { useTelegrams } from "../context/TelegramContext";

export default function AllTelegrams() {
  const { telegrams, getAllTelegrams, loading } = useTelegrams();

  const [sortOrder, setSortOrder] = useState("newest");

  useEffect(() => {
    getAllTelegrams(sortOrder);
  }, [sortOrder]);

  if (loading) {
    return (
      <section className="all-telegrams-page">
        <p>Loading telegrams...</p>
      </section>
    );
  }

  return (
    <section className="all-telegrams-page">
      <div className="all-telegrams-header">
        <h1>All Telegrams</h1>

        <p>Messages carried by love, memory, and the wind.</p>

        <div className="sort-controls">
          <label htmlFor="sortOrder">Sort by:</label>

          <select
            id="sortOrder"
            value={sortOrder}
            onChange={(event) => setSortOrder(event.target.value)}
          >
            <option value="newest">Newest</option>

            <option value="oldest">Oldest</option>
          </select>
        </div>
      </div>

      <div className="telegram-grid">
        {telegrams.map((telegram) => (
          <Envelope key={telegram.id} telegram={telegram} />
        ))}
      </div>
    </section>
  );
}
