
import { CalendarEvent } from '../ical-creator';

import { formatTimestamp } from './format-time-stamp';

export const localDate = (event: CalendarEvent): {day: number, month: number, year: number, hour: number, minute: number} => {
  // very hacky way to get local date parts from a date in a timezone
  // luxon can do this, but the ics library wants an array of numbers
  // so we convert the date to a formatted string in the right timezone
  // and then split that string into parts and convert them to numbers
  // this is not very robust, but it works for now
  const date = event.startTimeUtc;
  const dateStr =  date.toISOString();
  const formatedLocalDate =  formatTimestamp(dateStr, event.timezone, 
    { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: false });
 const [day, month, year, hour, minute] = formatedLocalDate?.split(/[\s,\/:\-]+/).map((x:string)=> parseInt(x)) || [];
  return { day, month, year, hour, minute };
}

