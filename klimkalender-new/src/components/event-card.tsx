import type { CalendarEvent } from './small-card';
import './EventCard.css';
import FeatureCard from './feature-card';
import SmallCard from './small-card';

function EventCard({ event }: { event: CalendarEvent }) {
  if (event.featured) {
    return <FeatureCard event={event} />
  }
  return <SmallCard event={event} />;
}

export default EventCard;