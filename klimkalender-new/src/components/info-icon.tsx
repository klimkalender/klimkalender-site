import React from "react";

const InfoIcon: React.FC<{ size?: number; color?: string; style?: React.CSSProperties }> = ({ size = 20, color = "#35545f", style }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={style}
  >
    <circle cx="10" cy="10" r="9" stroke={color} strokeWidth="2" fill="none" />
    <rect x="9" y="8" width="2" height="6" rx="1" fill={color} />
    <rect x="9" y="5" width="2" height="2" rx="1" fill={color} />
  </svg>
);

export default InfoIcon;
