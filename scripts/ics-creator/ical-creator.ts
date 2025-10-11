import * as ics from 'ics'
import { writeFileSync } from 'fs'
import { join } from 'path'
import { readFile } from 'fs/promises'
import { formatTimestamp } from './utils/format-time-stamp';
import { isDateFullDate } from './utils/is-full-date';

export type CalendarEvent = {
  id: string;
  title: string;
  date: Date;
  startTimeUtc: Date;
  endTimeUtc: Date;
  timezone: string;
  venueName: string;
  venueImage: string;
  link: string;
  tags: string[];
  featured?: boolean;
  featuredImage?: string;
  featuredText?: string;
};

const readEvents = async () => {
  const eventsJsonPath = join(__dirname, '../../klimkalender-new/public/events.json')
  const data = await readFile(eventsJsonPath, 'utf-8')
  const rawEvents = JSON.parse(data)
  const events = rawEvents.map((event: Omit<CalendarEvent, 'date'> & { date: string }) => {
    return {
      ...event,
      date: new Date(event.date),
      startTimeUtc: new Date(event.startTimeUtc),
      endTimeUtc: new Date(event.endTimeUtc),
    } as CalendarEvent;
  });
  return events;
}

const createIcal = async (): Promise<void> => {
  const events: CalendarEvent[] = await readEvents()

  const icsEvents = events.map((event): ics.EventAttributes => {

    const isfullDate = isDateFullDate(event);
    const startDate: [number, number, number] | [number, number, number, number, number] = [
      event.startTimeUtc.getFullYear(),
      event.startTimeUtc.getMonth() + 1,
      event.startTimeUtc.getDate(),
    ];
    if (!isfullDate) {
      startDate.push(event.startTimeUtc.getHours(), event.startTimeUtc.getMinutes());
    }

    const endDate: [number, number, number] | [number, number, number, number, number] = [
      event.endTimeUtc.getFullYear(),
      event.endTimeUtc.getMonth() + 1,
      event.endTimeUtc.getDate(),
    ];
    if (!isDateFullDate) {
      endDate.push(event.endTimeUtc.getHours(), event.endTimeUtc.getMinutes());
    }

    return {
      uid: `kk_event_${event.id}`,
      start: startDate,
      startInputType: 'utc',
      endInputType: 'utc',
      end: endDate,
      title: event.title,
      location: event.venueName,
      url: event.link,
    }
  })

  ics.createEvents(icsEvents, (error, value) => {
    if (error) {
      console.error(error)
      return
    }

    const icsFilePath = join(__dirname, '../../klimkalender-new/public/events.ics')
    writeFileSync(icsFilePath, value)
    console.log(`ICS file created at ${icsFilePath}`)
  })
}


createIcal()  