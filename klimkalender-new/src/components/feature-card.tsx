import type { CalendarEvent } from './small-card';

function formatEventDate(date: Date) {
  return date.toLocaleDateString('nl-NL', { weekday: 'short', day: 'numeric', month: 'short' });
}

function FeatureCard({ event }: { event: CalendarEvent }) {
  return <article className="featured-split"><div className="fs-media">
    <img src={event.featuredImage} alt="Catch010" />
    {event.tags.map(tag => (
      <span key={tag} className={`badge-type ${tag.toUpperCase()}`}>{tag}</span>
    ))}
    <span className="fs-tag">Uitgelicht · {event.venueName}</span>
  </div>
    <div className="fs-info">
      <div className="fs-header">
        <h3 className="fs-title">{event.title}</h3>
        <span className="fs-logo">
          <img src={event.venueImage} alt="logo" />
        </span>
      </div>
      <p className="fs-sub">{formatEventDate(event.date)} · {event.venueName}</p>
      <p className="fs-desc">{event.featuredText}</p>
      <a className="fs-link" href={event.link} target="_blank" rel="noopener">Meer info →</a>
    </div>
  </article>
}

export default FeatureCard;