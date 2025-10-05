export type CalendarEvent = {
  id: string;
  title: string;
  date: Date;
  venueName: string;
  venueImage: string;
  featured?: boolean;
  featuredImage?: string;
  featuredText?: string;
  link: string;
  tags: string[];
}

function formatEventDate(date: Date) {
  return date.toLocaleDateString('nl-NL', { weekday: 'short', day: 'numeric', month: 'short' });
}

function SmallCard({ event }: { event: CalendarEvent }) {
  return <article className="card" onClick={() => window.open(event.link, '_blank')}>
    <div className="logo-col">
      <img src={event.venueImage || './images/venue/no-image.png'} alt="hal logo" />
    </div>
    <div className="info">
      <h3 className="title">
        {event.tags.map(tag => (
          <span key={tag} className={`badge-type ${tag.toUpperCase()}`}>{tag}</span>
        ))}
        {/* eslint-disable-next-line react-dom/no-dangerously-set-innerhtml */}
        <span dangerouslySetInnerHTML={{ __html: event.title || '' }} />
      </h3>
      <p className="meta">
        <span className="dot"></span>
        {formatEventDate(event.date)} – {event.venueName}
      </p>
      <a className="cta" href={event.link} target="_blank" rel="noopener">Meer info →</a>
    </div>
  </article>
}

export default SmallCard;