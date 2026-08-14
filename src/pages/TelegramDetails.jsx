import { Link, useParams } from "react-router";

import { mockTelegrams } from "../data/mockTelegrams";

export default function TelegramDetails() {
  const { id } = useParams();

  const telegram = mockTelegrams.find((telegram) => telegram.id === Number(id));

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

        <Link className="back-to-telegrams" to="/telegrams">
          Back to All Telegrams
        </Link>
      </article>
    </section>
  );
}
