import type { CalendarEvent } from '../app';
import './event-card.css';
import FeatureCard from './feature-card';
import SmallCard from './small-card';

function EventCard({ event }: { event: CalendarEvent }) {
  if (event.featured) {
    return <FeatureCard event={event} />
  }
  return <SmallCard event={event} />;
}

export default EventCard;