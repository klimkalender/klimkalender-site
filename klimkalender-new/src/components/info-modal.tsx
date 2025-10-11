import React from "react";
import './info-modal.css';

interface InfoModalProps {
  open: boolean;
  onClose: () => void;
}

const InfoModal: React.FC<InfoModalProps> = ({ open, onClose }) => {
  if (!open) return null;

  const webcalUrl = `webcal://${window.location.hostname}${window.location.port ? `:${window.location.port}` : ''}${window.location.pathname}events.ics`;
  const httpIcalUrl = `${window.location.protocol}//${window.location.hostname}${window.location.port ? `:${window.location.port}` : ''}${window.location.pathname}events.ics`;

  return (
    <div className="info-modal-overlay" onClick={(e) => { e.stopPropagation(); onClose(); }}>
      <div className="info-modal" onClick={e => e.stopPropagation()}>

        <button
          type="button"
          aria-label="Sluit info"
          className="info-modal-close"
          onClick={onClose}
        >
          &#10005;
        </button>
        <div className="info-modal-logo-container">
          <img
            src="/klimkalender-site/images/logo.png"
            alt="Klimkalender logo"
            className="info-modal-logo"
            style={{ height: '54px', display: 'block' }}
          />
        </div>
        <div className="info-modal-header">
          <button type="button" className="info-modal-calendar-button" onClick={onClose}>Naar de kalender</button>
        </div>
        <div className="info-modal-content">
          <figure className="info-modal-figure">
            <img src="/klimkalender-site/images/hero.jpeg" alt="Klimmer die een overhangende boulder beklimt in een klimhal" className="info-modal-img" />
          </figure>
          <div className="info-modal-text">
            <h1>Dé kalender voor boulder- en leadwedstrijden in Nederland</h1>
            <p><strong>Klimkalender</strong> is hét overzicht voor fanatieke klimmers en boulderaars. Wedstrijden zijn dé manier om te groeien: je ontdekt nieuwe hallen, andere bouwstijlen en uitdagende routes &amp; boulders — en je tilt jezelf (én je klimmaten) naar een hoger niveau.</p>
            <p>Elke week worden er in Nederland wedstrijden georganiseerd. Op Klimkalender vind je ze allemaal bij elkaar: van lokale fun-comps tot officiële NKBV-wedstrijden. We zijn een initiatief van enthousiaste wedstrijdklimmers en volledig niet‑commercieel.</p>
            <h2> Mis je een wedstrijd?</h2>
            <p>Laat het ons weten via instagram <a href="https://www.instagram.com/klimkalender/">@klimkalender</a></p>
            <h2>Abonneer op de kalender</h2>
            <p>Wil je alle klim- en boulderwedstrijden in Nederland in je agenda? Abonneer je dan op onze kalender via een van de onderstaande opties:</p>
            <ul>
              <li><a href={`https://www.google.com/calendar/render?cid=${encodeURIComponent(webcalUrl)}`}>Google Calendar</a></li>
              <li><a href={`https://outlook.office.com/owa?path=/calendar/action/compose&rru=addsubscription&url=${encodeURIComponent(webcalUrl)}&name=Klimkalender+Klimwedstrijdoverzicht`}>Outlook 365</a></li>
              <li><a href={`https://outlook.live.com/owa?path=/calendar/action/compose&rru=addsubscription&url=${encodeURIComponent(webcalUrl)}&name=Klimkalender+Klimwedstrijdoverzicht  `}>Microsoft Outlook</a></li>
              <li><a href={webcalUrl}>iCalendar</a></li>
              <li><a href={httpIcalUrl} target="_blank" rel="noopener noreferrer nofollow noindex">Download ical bestand</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoModal;
