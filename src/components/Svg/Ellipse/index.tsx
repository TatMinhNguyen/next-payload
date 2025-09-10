import * as React from 'react';

export default function Ellipse() {
  const divStyle: React.CSSProperties = {
    backdropFilter: 'blur(4px)',
    clipPath: 'url(#bgblur_0_5511_1735_clip_path)',
    height: '100%',
    width: '100%',
  };

  return (
    <svg
      width="345"
      height="345"
      viewBox="0 0 345 345"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <foreignObject x="-8" y="-8" width="361" height="361">
        <div xmlns="http://www.w3.org/1999/xhtml" style={divStyle} />
      </foreignObject>
      <circle
        data-figma-bg-blur-radius="8"
        cx="172.5"
        cy="172.5"
        r="172"
        stroke="url(#paint0_linear_5511_1735)"
      />
      <defs>
        <clipPath id="bgblur_0_5511_1735_clip_path" transform="translate(8 8)">
          <circle cx="172.5" cy="172.5" r="172" />
        </clipPath>
        <linearGradient id="paint0_linear_5511_1735" x1="172.5" y1="0" x2="172.5" y2="345" gradientUnits="userSpaceOnUse">
          <stop stopColor="#6946FF" />
          <stop offset="1" stopColor="#09196B" />
        </linearGradient>
      </defs>
    </svg>
  );
}
