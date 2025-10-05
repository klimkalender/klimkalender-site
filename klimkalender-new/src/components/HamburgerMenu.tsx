
import React, { useState } from "react";
import MenuModal from "./MenuModal";

const HamburgerMenu: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        aria-label="Open menu"
        onClick={() => setOpen(true)}
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
          fontSize: '2rem',
          color: '#696969ff',
        }}
      >
      ℹ</button>
      <MenuModal open={open} onClose={() => setOpen(false)} />
    </>
  );
};

export default HamburgerMenu;
