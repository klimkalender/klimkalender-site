import type { CalendarEvent } from '../ical-creator';
import { formatTimestamp } from './format-time-stamp';

export const isDateFullDate = (event: CalendarEvent): boolean => {
  const timeStart = formatTimestamp(event.startTimeUtc.toISOString(), event.timezone, {
    hour: '2-digit',
    hour12: false,
    minute: '2-digit'
  });
  const timeEnd = formatTimestamp(event.endTimeUtc.toISOString(), event.timezone, {
    hour: '2-digit',
    hour12: false,
    minute: '2-digit'
  });
  const isFullDate = timeStart === '00:00' && timeEnd === '00:00' || timeEnd === '23:59';
  return isFullDate;
}
