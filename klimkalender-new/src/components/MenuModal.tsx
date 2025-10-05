import React from "react";

interface MenuModalProps {
  open: boolean;
  onClose: () => void;
}

const MenuModal: React.FC<MenuModalProps> = ({ open, onClose }) => {
  if (!open) return null;
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        background: "rgba(0,0,0,0.4)",
        zIndex: 90000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: "12px",
          padding: "32px 24px",
          boxShadow: "0 4px 24px rgba(0,0,0,0.15)",
          display: "flex",
          flexDirection: "column",
          gap: "24px",
          position: "relative",
          minWidth: "90vw",
          minBlockSize: "90vh",
        }}
        onClick={e => e.stopPropagation()}
      >
        <button
          type="button"
          aria-label="Sluit menu"
          onClick={onClose}
          style={{
            position: "absolute",
            top: 12,
            right: 12,
            background: "none",
            border: "none",
            fontSize: "1.0rem",
            color: "#35545f",
            cursor: "pointer",
            padding: 0,
            lineHeight: 1,
          }}
        >
          &#10005;
        </button>
        <a href="#over-ons" style={{ fontSize: "1.2rem", color: "#35545f", textDecoration: "none" }}>Over ons</a>
        <a href="#tip-ons" style={{ fontSize: "1.2rem", color: "#35545f", textDecoration: "none" }}>Tip ons</a>
      </div>
    </div>
  );
};

export default MenuModal;
