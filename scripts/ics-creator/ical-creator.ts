import * as ics from 'ics'
import { writeFileSync } from 'fs'
import { join } from 'path'
import { readFile } from 'fs/promises'
import { formatTimestamp } from './utils/format-time-stamp';
import { isDateFullDate } from './utils/is-full-date';
import { localDate } from './utils/local-date';

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

const cleanTitle = (title: string): string => {
  return title.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim().replace(/&#8211;/g, '-');
}

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

    const localDatePartsStart = localDate(event.startTimeUtc, event.timezone);
    const isfullDate = isDateFullDate(event);
    const startDate: [number, number, number] | [number, number, number, number, number] = [
      localDatePartsStart.year,
      localDatePartsStart.month,
      localDatePartsStart.day,
    ];
    if (!isfullDate) {
      startDate.push(localDatePartsStart.hour, localDatePartsStart.minute);
    }

    const localDatePartsEnd = localDate(event.endTimeUtc, event.timezone);
    const endDate: [number, number, number] | [number, number, number, number, number] = [
      localDatePartsEnd.year,
      localDatePartsEnd.month,
      localDatePartsEnd.day,
    ];
    if (!isDateFullDate) {
      endDate.push(localDatePartsEnd.hour, localDatePartsEnd.minute);
    }

    return {
      uid: `kk_event_${event.id}`,
      start: startDate,
      startInputType: 'utc',
      endInputType: 'utc',
      end: endDate,
      title: cleanTitle(event.title),
      location: cleanTitle(event.venueName),
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