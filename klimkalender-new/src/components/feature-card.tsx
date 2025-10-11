import type { CalendarEvent } from '../app';

function formatEventDate(date: Date) {
  return date.toLocaleDateString('nl-NL', { weekday: 'short', day: 'numeric', month: 'short' });
}

function FeatureCard({ event }: { event: CalendarEvent }) {
  return <article className="featured-split"><div className="fs-media">
    <img src={event.featuredImage} alt={event.title} onClick={() => window.open(event.link, '_blank')}/>
    {event.tags.map(tag => (
      <span key={tag} className={`badge-type ${tag.toUpperCase()}`}>{tag}</span>
    ))}
    <span className="fs-tag">Uitgelicht · {event.venueName}</span>
  </div>
    <div className="fs-info">
      <div className="fs-header">
        {/* eslint-disable-next-line react-dom/no-dangerously-set-innerhtml */}
        <h3 className="fs-title"><span dangerouslySetInnerHTML={{ __html: event.title || '' }} /></h3>
        <span className="fs-logo">
          <img src={event.venueImage || './images/venue/no-image.png'} alt="logo" />
        </span>
      </div>
      <p className="fs-sub">{formatEventDate(event.date)} · {event.venueName}</p>
      {/* eslint-disable-next-line react-dom/no-dangerously-set-innerhtml */}
      <span dangerouslySetInnerHTML={{ __html: event.featuredText || '' }} />
      <a className="fs-link" href={event.link} target="_blank" rel="noopener">Meer info →</a>
    </div>
  </article>
}

export default FeatureCard;