import InfoIcon from './components/InfoIcon';
import InfoModal from './components/InfoModal';
import './App.css'
import EventCard from './components/event-card';
import { startOfISOWeek, endOfISOWeek, getISOWeek } from 'date-fns';
import Fuse from "fuse.js";
import { AnimatePresence, motion } from 'motion/react';
import React, { Fragment, useEffect, useMemo, useState, useRef } from "react";
import Select from 'react-select';

type EventType = {
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


const options = {
  includeScore: true,
  includeMatches: true,
  isCaseSensitive: false,
  findAllMatches: true,
  ignoreLocation: true,
  useExtendedSearch: true,
  threshold: 0.2,
  keys: [{ name: 'searchField', getFn: (event: EventType) => event.title + ' ' + event.venueName + ' ' + event.tags.join(' ')}]
}

const categoryOptions: readonly { value: string, label: string }[] = [
  { value: 'all', label: 'Alle' },
  { value: 'boulder', label: 'Boulder' },
  { value: 'lead', label: 'Lead' },
  { value: 'overig', label: 'Overig' },
];


function App() {
  const [showInfo, setShowInfo] = useState(false);

  const [events, setEvents] = useState<EventType[]>([]);
  const [searchResults, setSearchResults] = useState<EventType[]>([]);
  const [searchTerm, setSearchTerm] = useState<string | null>(null);
  const [category, setCategory] = useState<string>('all');
  const inputRef = useRef<HTMLInputElement | null>(null);

  const scrollWithUseRef = () => {
    console.log('scrolling');
    console.log(inputRef.current);
    inputRef.current?.scrollIntoView({ block: "nearest", behavior: "smooth" });
  };

  useEffect(() => {
    fetch('/klimkalender-site/events.json')
      .then(res => res.json())
      .then((data: (Omit<EventType, 'date'> & { date: string })[]) => {
        // Convert date strings to Date objects and preserve all properties
        const parsed: EventType[] = data.map((event) => {
          return {
            ...event,
            date: new Date(event.date)
          } as EventType;
        });
        setEvents(parsed);
        setSearchResults(parsed);
      });
  }, []);


  const fuse = useMemo(() => new Fuse(events, options), [events]);

  useEffect(() => {
    if (searchTerm && searchTerm.length > 0) {
      const results = fuse.search(searchTerm);
      const items = results.map((result) => result.item);
      setSearchResults(items);
    } else {
      setSearchResults(events);
    }
  }, [searchTerm, fuse, events]);

  useEffect(() => {
    const results = searchTerm ? fuse.search(searchTerm) : events.map(event => ({ item: event, refIndex: 0, score: 0, matches: [] }));
    const items = results.map((result) => result.item).
      sort((a, b) => a.date.getTime() - b.date.getTime());
    if (category && category !== 'all') {
      const capsCategory = category.toUpperCase();
      setSearchResults(items.filter(item => item.tags.includes(capsCategory)));
    } else {
      setSearchResults(items);
    }
  }, [category, searchTerm, fuse, events]);

  const handleTextSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setSearchTerm(value || '');
    scrollWithUseRef();

  };


  function formatWeekDates(date: Date) {
    const startOfWeek = startOfISOWeek(date);
    const endOfWeek = endOfISOWeek(date);
    return `${startOfWeek.toLocaleDateString('nl-NL', { day: 'numeric', month: 'short' })} - ${endOfWeek.toLocaleDateString('nl-NL', { day: 'numeric', month: 'short' })}`;
  }

  // Create a nested structure
  type WeekGroup = { week: number; startOfWeek: Date; endOfWeek: Date; events: EventType[] };
  type YearGroup = { year: number; weeks: WeekGroup[] };
  const groupedEvents: YearGroup[] = searchResults.reduce((acc: YearGroup[], event: EventType) => {
    const year = event.date.getFullYear();
    const week = getISOWeek(event.date);
    const startOfWeek = startOfISOWeek(event.date);
    const endOfWeek = endOfISOWeek(event.date);

    let yearGroup = acc.find((y: YearGroup) => y.year === year);
    if (!yearGroup) {
      yearGroup = { year, weeks: [] };
      acc.push(yearGroup);
    }

    let weekGroup = yearGroup.weeks.find((w: WeekGroup) => w.week === week);
    if (!weekGroup) {
      weekGroup = { week, startOfWeek, endOfWeek, events: [] };
      yearGroup.weeks.push(weekGroup);
    }

    weekGroup.events.push(event);
    return acc;
  }, []);


  return (
    <>  
      <InfoModal open={showInfo} onClose={() => setShowInfo(false)} />
      <div className='header-wrapper'>
        <header className="site" aria-label="Site header">
          <div className="left">
            <img className="logo" src="/klimkalender-site/images/logo.png" alt="Klimkalender logo" />
          </div>
          <div className="right">
            <nav aria-label="Hoofdmenu">
              <button
                id="nav-about"
                type="button"
                style={{ display: 'flex', alignItems: 'center', gap: '4px', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                onClick={(e) => {e.stopPropagation(); setShowInfo(true)}}
                aria-label="Over Klimkalender"
              >
                <InfoIcon />
              </button>
            </nav>
          </div>
        </header>
      </div>

      <div className="toolbar-wrap">
        <div className="toolbar">
          <div className="toolbar-card">
            <div className="toolbar-row">
              <div className="search">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M21 21l-4.35-4.35m1.35-5.65a7 7 0 11-14 0 7 7 0 0114 0z" stroke="#5a7d8a" strokeWidth="2" strokeLinecap="round" />
                </svg>
                <input type="search" placeholder="Zoek op wedstrijd, hal, tag of plaats…" aria-label="Zoek in wedstrijden" onChange={handleTextSearch} onReset={handleTextSearch} />
              </div>
              <div className="type-filter">
                <Select
                  options={categoryOptions}
                  defaultValue={categoryOptions[0]}
                  onChange={(value) => { setCategory(value ? value.value : 'all'); }}
                />
              </div> 
              {/* <div className="view-toggle" role="tablist" aria-label="Weergave">
                <button type="button" role="tab" aria-selected="true" aria-pressed="true">Kalender</button>
               <button type="button" role="tab" aria-selected="false" aria-pressed="false">Kaart</button>
              </div> */}
            </div>
            <div>
          {searchResults.length === 0 && <motion.p initial={{ opacity: 0, fontWeight: "normal" }} animate={{ opacity: 1, fontWeight: "bold" }} transition={{ duration: 0.5, delay: 0.1 }}>Geen wedstrijden gevonden.</motion.p>}
          {searchResults.length === 1 && <motion.p initial={{ opacity: 0, fontWeight: "normal" }} animate={{ opacity: 1, fontWeight: "bold" }} transition={{ duration: 0.5, delay: 0.1 }}>{searchResults.length} {searchResults.length === 1 ? 'wedstrijd' : 'wedstrijden'} gevonden.</motion.p>}
          {searchResults.length > 1 && <motion.p initial={{ opacity: 0, fontWeight: "normal" }} animate={{ opacity: 1, fontWeight: "bold" }} transition={{ duration: 0.5, delay: 0.1 }}>{searchResults.length} {searchResults.length === 1 ? 'wedstrijd' : 'wedstrijden'} gevonden.</motion.p>}

            </div>
          </div>
        </div>
      </div>
      <main >
        <span style={{ position: "absolute", top: "10px", left: 0 }} ref={inputRef}></span>
        <section className="container view-list" aria-label="Kalenderweergave" >

 
          <AnimatePresence>
            {groupedEvents.map((yearGroup: YearGroup) => {
              return <Fragment key={yearGroup.year}><div className="year-title" aria-label="Jaar">{yearGroup.year}</div>
                <div id="calendar">
                  {yearGroup.weeks.map((weekGroup: WeekGroup) => {
                    return (
                      <motion.section exit={{ opacity: 0 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="week-block" key={`${weekGroup.week}-${yearGroup.year}`}>
                        <div className="week-header">
                          <span className="chip">WEEK {weekGroup.week}</span>
                          <span className="week-dates">{formatWeekDates(weekGroup.startOfWeek)}</span>
                        </div>
                        <div className="grid">
                          {weekGroup.events.map((event: EventType) => (
                            <EventCard key={event.id} event={event} />
                          ))}
                        </div>
                      </motion.section>
                    );
                  })}
                </div></Fragment>
            })}</AnimatePresence>
        </section>

        <section className="container map-wrap" aria-label="Kaartweergave">
          <div className="map">🗺️ Kaartweergave komt eraan — gebruik de toggle om te wisselen.</div>
        </section>
      </main>
      <footer id="over-ons" className="container" style={{ paddingTop: "24px", paddingBottom: "24px", color: "#35545f" }}>
        <hr style={{ border: "none", borderTop: "1px solid #e1eceb", marginBottom: "12px" }} />
        <h2 style={{ margin: "6px 0 6px", fontSize: "18px" }}>&copy; Klimkalender 2025</h2>
        <p style={{ margin: "0" }}>Klimkalender is een niet‑commercieel initiatief van en voor wedstrijdklimmers. Tip ons gerust over via instagram <a href="https://www.instagram.com/klimkalender/" target="_blank" rel="noreferrer noopener">@klimkalender</a> over een ontbrekende wedstrijd!</p>
      </footer>
    </> 
  )
}

export default App
