import { useState } from "react";

import Envelope from "../components/Envelope";
import { useTelegrams } from "../context/TelegramContext";

export default function AllTelegrams() {
  const { telegrams } = useTelegrams();

  const [sortOrder, setSortOrder] = useState("newest");

  const sortedTelegrams = [...telegrams].sort((a, b) => {
    const dateA = new Date(a.created_at);
    const dateB = new Date(b.created_at);

    if (sortOrder === "newest") {
      return dateB - dateA;
    }

    return dateA - dateB;
  });

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
        {sortedTelegrams.map((telegram) => (
          <Envelope key={telegram.id} telegram={telegram} />
        ))}
      </div>
    </section>
  );
}
