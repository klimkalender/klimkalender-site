import type { CalendarEvent } from '../app';
import { formatEventDate, isMultiDayEvent } from '../utils/date-utils';


function SmallCard({ event }: { event: CalendarEvent }) {
  return <article className="card">
    <div className="logo-col" onClick={() => window.open(event.link, '_blank')}>
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
        {formatEventDate(event.date)} 
        { isMultiDayEvent(event) ? <span> - {formatEventDate(event.endTimeUtc)} </span> : null }
        <span className="venue-name"> · {event.venueName}</span>
      </p>
      <a className="cta" href={event.link} target="_blank" rel="noopener">Meer info →</a>
    </div>
  </article>
}

export default SmallCard;