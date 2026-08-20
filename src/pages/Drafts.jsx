import { Link } from "react-router";

import { useAuth } from "../auth/AuthContext";
import { useTelegrams } from "../context/TelegramContext";

export default function Drafts() {
  const { user } = useAuth();
  const { telegrams } = useTelegrams();

  const drafts = telegrams.filter(
    (telegram) => telegram.user_id === user?.id && telegram.status === "draft",
  );

  return (
    <section className="all-telegrams-page">
      <div className="all-telegrams-header">
        <h1>Drafts</h1>

        <p>Unfinished telegrams you have saved for later.</p>
      </div>

      {drafts.length === 0 ? (
        <div className="no-drafts-message">
          <p>You do not have any saved drafts yet.</p>

          <Link to="/telegrams/create">Create a New Telegram</Link>
        </div>
      ) : (
        <div className="draft-grid">
          {drafts.map((draft) => (
            <article className="draft-card" key={draft.id}>
              <p>To:</p>

              <h2>{draft.recipient_name || "Untitled Draft"}</h2>

              <p className="draft-preview">
                {draft.message || "No message written yet."}
              </p>

              <Link className="draft-link" to={`/drafts/${draft.id}/edit`}>
                Continue Draft
              </Link>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
