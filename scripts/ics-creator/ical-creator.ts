import * as ics from 'ics'
import { writeFileSync } from 'fs'
import { join } from 'path'
import { readFile } from 'fs/promises'

export type EventType = {
  id: string;
  title: string;
  date: Date;
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
  const events = rawEvents.map((event: Omit<EventType, 'date'> & { date: string }) => {
    return {
      ...event,
      date: new Date(event.date)
    } as EventType;
  });
  return events;
}
const createIcal = async (): Promise<void> => {
  const events: EventType[] = await readEvents()

  const icsEvents = events.map((event):ics.EventAttributes => {
   
    const startDate: [number, number, number, number, number] = [
      event.date.getFullYear(),
      event.date.getMonth() + 1,
      event.date.getDate(),
      event.date.getHours(),
      event.date.getMinutes()
    ];

    const endDate: [number, number, number, number, number] = [
      event.date.getFullYear(),
      event.date.getMonth() + 1,
      event.date.getDate(),
      event.date.getHours(),
      event.date.getMinutes() +5
    ];

    return {
      start: startDate,
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