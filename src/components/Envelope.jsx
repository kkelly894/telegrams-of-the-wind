import { Link } from "react-router";

export default function Envelope({ telegram }) {
  const senderName = telegram.is_anonymous ? "Anonymous" : telegram.sender_name;

  const createdDate = new Date(telegram.created_at).toLocaleDateString();

  return (
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
  );
}
