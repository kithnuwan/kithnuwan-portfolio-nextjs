'use client';

import { useState } from 'react';

const ease = 'cubic-bezier(0.4, 0, 0.2, 1)';
const DURATION = '200ms';

/**
 * Renders corner-bracket "lock-on" decoration around children on hover.
 * Uses pure CSS transforms — no reflow triggered.
 */
export function GeometricHover({ children, className = '', color = '#00BFFF', size = 7, gap = 5 }) {
  const [active, setActive] = useState(false);

  const corner = (pos) => {
    const styles = {
      position: 'absolute',
      width: size,
      height: size,
      borderColor: color,
      borderStyle: 'solid',
      opacity: active ? 1 : 0,
      transition: `opacity ${DURATION} ${ease}, top ${DURATION} ${ease}, left ${DURATION} ${ease}, right ${DURATION} ${ease}, bottom ${DURATION} ${ease}`,
      pointerEvents: 'none',
    };

    switch (pos) {
      case 'tl':
        return {
          ...styles,
          top: active ? -gap : 0,
          left: active ? -gap : 0,
          borderWidth: '1.5px 0 0 1.5px',
        };
      case 'tr':
        return {
          ...styles,
          top: active ? -gap : 0,
          right: active ? -gap : 0,
          borderWidth: '1.5px 1.5px 0 0',
        };
      case 'bl':
        return {
          ...styles,
          bottom: active ? -gap : 0,
          left: active ? -gap : 0,
          borderWidth: '0 0 1.5px 1.5px',
        };
      case 'br':
        return {
          ...styles,
          bottom: active ? -gap : 0,
          right: active ? -gap : 0,
          borderWidth: '0 1.5px 1.5px 0',
        };
    }
  };

  return (
    <span
      className={`relative inline-flex ${className}`}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
    >
      <span style={corner('tl')} />
      <span style={corner('tr')} />
      <span style={corner('bl')} />
      <span style={corner('br')} />
      {children}
    </span>
  );
}
