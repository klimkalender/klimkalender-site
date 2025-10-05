import React from "react";

const HamburgerMenu: React.FC<{ onClick?: () => void }> = ({ onClick }) => (
  <button
    type="button"
    aria-label="Open menu"
    onClick={onClick}
    style={{
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      padding: 0,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      width: '40px',
      height: '40px',
    }}
  >
    {[0, 1, 2].map(i => (
      <span
        key={i}
        style={{
          display: 'block',
          width: '28px',
          height: '4px',
          background: '#35545f',
          margin: '4px 0',
          borderRadius: '2px',
        }}
      />
    ))}
  </button>
);

export default HamburgerMenu;
