import { DateTime, type DateTimeFormatOptions } from 'luxon';
import type { CalendarEvent } from '../app';


export const formatTimestamp = (
  timestamp: string,
  timezone?: string,
  localeStringSettings?: DateTimeFormatOptions
): string | null => {
  const defaultLocaleStringSettings: DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    hour12: false,
    minute: '2-digit',
    second: '2-digit'
  };
  const parsedTimeObject = DateTime.fromISO(timestamp);

  if (!parsedTimeObject.isValid) {
    return null;
  }

  const formattedDateTime = parsedTimeObject
    .setZone( timezone)
    .setLocale('nl-NL')
    .toLocaleString(localeStringSettings || defaultLocaleStringSettings);

  return formattedDateTime;
};


export const getBrowserLocale = (): string | undefined => {
  if (!(window.navigator.languages.length === 0)) {
    return window.navigator.languages[0];
  }
  return window.navigator.language;
};


export function formatEventDate(date: Date) {
  return date.toLocaleDateString('nl-NL', { weekday: 'short', day: 'numeric', month: 'short' });
}

export function isMultiDayEvent(event: CalendarEvent): boolean {
  return formatTimestamp(event.startTimeUtc.toISOString(), event.timezone, {
    year: 'numeric',
    month: 'short',
    day: '2-digit'}) !== formatTimestamp(event.endTimeUtc.toISOString(), event.timezone, {
    year: 'numeric',
    month: 'short',
    day: '2-digit'});
}