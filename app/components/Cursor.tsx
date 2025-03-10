interface CursorProps {
  x: number;
  y: number;
  name: string;
  color: string;
}

export function Cursor({ x, y, name, color }: CursorProps) {
  return (
    <div
      className="pointer-events-none absolute top-0 left-0"
      style={{
        transform: `translateX(${x}px) translateY(${y}px)`,
      }}
    >
      <svg
        className="relative"
        width="24"
        height="36"
        viewBox="0 0 24 36"
        fill="none"
        stroke="white"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M5.65376 12.3673H5.46026L5.31717 12.4976L0.500002 16.8829L0.500002 1.19841L11.7841 12.3673H5.65376Z"
          fill={color}
        />
      </svg>

      <div
        className="absolute left-2 top-5 rounded-md px-3 py-2 text-sm"
        style={{ backgroundColor: color }}
      >
        <p className="font-medium text-white">{name}</p>
      </div>
    </div>
  );
}
