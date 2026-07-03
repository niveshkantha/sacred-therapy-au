"use client";

import { type SVGProps } from "react";

export function FlowerOfLife({
  className,
  strokeWidth = 0.6,
  ...props
}: SVGProps<SVGSVGElement> & { strokeWidth?: number }) {
  const r = 14;
  const cx = 100;
  const cy = 100;

  const positions: Array<[number, number]> = [[cx, cy]];

  for (let i = 0; i < 6; i++) {
    const a = (Math.PI / 3) * i;
    positions.push([cx + r * Math.cos(a), cy + r * Math.sin(a)]);
  }

  for (let i = 0; i < 6; i++) {
    const a = (Math.PI / 3) * i;
    positions.push([cx + 2 * r * Math.cos(a), cy + 2 * r * Math.sin(a)]);
    const a2 = (Math.PI / 3) * i + Math.PI / 6;
    positions.push([
      cx + r * Math.sqrt(3) * Math.cos(a2),
      cy + r * Math.sqrt(3) * Math.sin(a2),
    ]);
  }

  return (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      className={className}
      aria-hidden="true"
      {...props}
    >
      <circle cx={cx} cy={cy} r={r * 3} />
      {positions.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={r} />
      ))}
    </svg>
  );
}
