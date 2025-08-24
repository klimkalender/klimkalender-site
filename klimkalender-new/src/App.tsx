import './App.css'
import EventCard from './components/event-card';
import { startOfISOWeek, endOfISOWeek, getISOWeek } from 'date-fns';

function App() {

  const events = [
    {
      id: "apex-3rd-anniversary-2025",
      title: "Apex 3rd Anniversary",
      date: new Date(2025, 8, 6),
      venueName: "Apex Boulders",
      venueImage: "/images/venue/apex.png",
      link: "https://www.apexboulders.nl/events/",
      tags: ["BOULDER"]
    },
    {
      id: "catch010-2025",
      title: "Catch010",
      date: new Date(2025, 8, 13),
      venueName: "Boulder Rotterdam",
      venueImage: "/images/venue/boulder.webp",
      featured: true,
      featuredImage: "/images/feature/boulder.jpeg",
      featuredText: "De meest gezellige boulderwedstrijd van het jaar keert terug in Rotterdam. Catch010 combineert sport en sfeer in een unieke setting.",
      link: "https://boulderneoliet.nl/nl/rotterdam/boulder-wedstrijd-catch010/",
      tags: ["BOULDER"]
    },
    {
      id: "luminous-skibidi-2025",
      title: "LUMINOUS – Skibidi sends",
      date: new Date(2025, 8, 9),
      venueName: "Radium Boulders",
      venueImage: "/images/venue/nkbv.png",
      link: "https://www.instagram.com/p/DNn_u_ls_3x/?igsh=djB2OTg3ZHllN3Rk",
      tags: ["BOULDER"]
    },
    {
      id: "catch055-2025",
      title: "Catch055",
      date: new Date(2025, 8, 12),
      venueName: "Boulder Apeldoorn",
      venueImage: "/images/venue/nkbv.png",
      link: "https://boulderneoliet.nl/nl/apeldoorn/boulder-wedstrijd-catch055/",
      tags: ["BOULDER"]
    },
    {
      id: "slab-fest-2025",
      title: "Slab Fest",
      date: new Date(2025, 8, 13),
      venueName: "GRIP Boulderhal",
      venueImage: "/images/venue/nkbv.png",
      link: "https://gripnijmegen.nl/boulderhal/2025/06/26/9810/",
      tags: ["BOULDER"]
    },
    {
      id: "blockmasters-2025",
      title: "Blockmasters 2025 – Festival Edition",
      date: new Date(2025, 8, 13),
      venueName: "Block013",
      venueImage: "/images/venue/nkbv.png",
      link: "https://www.instagram.com/p/DMc5pmesVT2/",
      tags: ["BOULDER"]
    },
    {
      id: "loco-1-2025",
      title: "LOCO #1 – Amsterdam",
      date: new Date(2025, 8, 13),
      venueName: "Monk Bouldergym Amsterdam",
      venueImage: "/images/venue/nkbv.png",
      link: "https://monk.nl/loco/",
      tags: ["BOULDER"]
    },
    {
      id: "beest-open-2025",
      title: "Beest Open – Amsterdam",
      date: new Date(2025, 8, 13),
      venueName: "Beest Boulders Amsterdam",
      venueImage: "/images/venue/nkbv.png",
      link: "https://beestboulders.com/beest-open/",
      tags: ["BOULDER"]
    },
    {
      id: "2",
      title: "12 YEARS STERK ANNIVERSARY",
      date: new Date(2025, 8, 20),
      venueName: "Boulderhal Sterk",
      venueImage: "/images/venue/nkbv.png",
      link: "https://www.boulderhalsterk.nl/evenementen/sterk-12-jaar",
      tags: ["BOULDER"]
    },
    {
      id: "1",
      title: "ZWAARTEKRACHT 2025",
      date: new Date(2025, 8, 20),
      venueName: "Boulderhal Krachtstof, Leiden",
      venueImage: "/images/venue/nkbv.png",
      link: "https://www.instagram.com/p/DM-uIdSN0DE/",
      tags: ["BOULDER"]
    }
  ];

  events.map(event => {
    const year = event.date.getFullYear();
    const week = getISOWeek(event.date);
    const startOfWeek = startOfISOWeek(event.date);
    const endOfWeek = endOfISOWeek(event.date);
    console.log(`Event ${event.title} is in week ${week} ${year}(${startOfWeek.toLocaleDateString('nl-NL', { day: 'numeric', month: 'short' })} - ${endOfWeek.toLocaleDateString('nl-NL', { day: 'numeric', month: 'short' })})`);
  });

  function formatWeekDates(date: Date) {
    const startOfWeek = startOfISOWeek(date);
    const endOfWeek = endOfISOWeek(date);
    return `${startOfWeek.toLocaleDateString('nl-NL', { day: 'numeric', month: 'short' })} - ${endOfWeek.toLocaleDateString('nl-NL', { day: 'numeric', month: 'short' })}`;
  }

  // Create a nested structure
  const groupedEvents = events.reduce((acc, event) => {
    const year = event.date.getFullYear();
    const week = getISOWeek(event.date);
    const startOfWeek = startOfISOWeek(event.date);
    const endOfWeek = endOfISOWeek(event.date);

    let yearGroup = acc.find(y => y.year === year);
    if (!yearGroup) {
      yearGroup = { year, weeks: [] as { week: number; startOfWeek: Date; endOfWeek: Date; events: typeof events }[] };
      acc.push(yearGroup);
    }

    let weekGroup = yearGroup.weeks.find(w => w.week === week);
    if (!weekGroup) {
      weekGroup = { week, startOfWeek, endOfWeek, events: [] };
      yearGroup.weeks.push(weekGroup);
    }

    weekGroup.events.push(event);
    return acc;
  }, [] as { year: number; weeks: { week: number; startOfWeek: Date; endOfWeek: Date; events: typeof events }[] }[]);




  return (
    <>
      <header className="site" aria-label="Site header">
        <div className="left">
          <img className="logo" src="/images/logo.png" alt="Klimkalender logo" />
          <nav aria-label="Hoofdmenu">
            <a href="#over-ons" id="nav-about">Over ons</a>
          </nav>
        </div>
        <div className="right" style={{ display: "flex", gap: "12px", alignItems: "center" }}></div>
      </header>

      <section className="hero-wrap" aria-label="Intro">
        <div className="hero-inner">
          <figure className="hero-photo">
            <img src="/images/hero.jpeg" alt="Klimmer die een overhangende boulder beklimt in een klimhal" />
          </figure>
          <div className="hero-text">
            <h1>De klimkalender voor boulder- en leadwedstrijden in Nederland</h1>
            <p><strong>Klimkalender</strong> is hét overzicht voor fanatieke klimmers en boulderaars. Wedstrijden zijn dé manier om te groeien: je ontdekt nieuwe hallen, andere bouwstijlen en uitdagende routes &amp; boulders — en je tilt jezelf (én je klimmaten) naar een hoger niveau.</p>
            <p>Elke week worden er in Nederland wedstrijden georganiseerd. Op Klimkalender vind je ze allemaal bij elkaar: van lokale fun-comps tot officiële NKBV-wedstrijden. We zijn een initiatief van enthousiaste wedstrijdklimmers en volledig niet‑commercieel. Mis je een wedstrijd? Laat het ons weten!</p>
          </div>
        </div>
      </section>

      <div className="toolbar-wrap">
        <div className="toolbar">
          <div className="toolbar-card">
            <div className="toolbar-row">
              <div className="search">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M21 21l-4.35-4.35m1.35-5.65a7 7 0 11-14 0 7 7 0 0114 0z" stroke="#5a7d8a" strokeWidth="2" strokeLinecap="round" />
                </svg>
                <input type="search" placeholder="Zoek op wedstrijd, hal of plaats…" aria-label="Zoek in wedstrijden" />
              </div>
              <div className="type-filter">
                <select aria-label="Filter op wedstrijdtype">
                  <option>Alle</option>
                  <option>Boulder</option>
                  <option>Lead</option>
                  <option>Overig</option>
                </select>
              </div>
              <div className="view-toggle" role="tablist" aria-label="Weergave">
                <button role="tab" aria-selected="true" aria-pressed="true">Kalender</button>
                <button role="tab" aria-selected="false" aria-pressed="false">Kaart</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <main>
        <section className="container view-list" aria-label="Kalenderweergave">
          {groupedEvents.map(yearGroup => {
            console.log(yearGroup);
            return <><div className="year-title" aria-label="Jaar">{yearGroup.year}</div>
              <div id="calendar">
                {yearGroup.weeks.map(weekGroup => {
                  return (
                    <section className="week-block" key={`${weekGroup.week}-${yearGroup.year}`}>
                      <div className="week-header">
                        <span className="chip">WEEK {weekGroup.week}</span>
                        <span className="week-dates">{formatWeekDates(weekGroup.startOfWeek)}</span>
                      </div>
                      <div className="grid">
                        {weekGroup.events.map(event => (
                          <EventCard key={event.id} event={event} />
                        ))}
                      </div>
                    </section>
                  );
                })}
              </div></>
          })}

        </section>

        <section className="container map-wrap" aria-label="Kaartweergave">
          <div className="map">🗺️ Kaartweergave komt eraan — gebruik de toggle om te wisselen.</div>
        </section>
      </main>
      <footer id="over-ons" className="container" style={{ paddingTop: "24px", paddingBottom: "24px", color: "#35545f" }}>
        <hr style={{ border: "none", borderTop: "1px solid #e1eceb", marginBottom: "12px" }} />
        <h2 style={{ margin: "6px 0 6px", fontSize: "18px" }}>Over ons</h2>
        <p style={{ margin: "0" }}>Klimkalender is een niet‑commercieel initiatief van en voor wedstrijdklimmers. Tip ons gerust over een ontbrekende wedstrijd!</p>
      </footer>
    </>
  )
}

export default App
