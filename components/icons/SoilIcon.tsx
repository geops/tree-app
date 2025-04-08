function SoilIcon({ size = 16, value = 1 }: { size?: number; value: number }) {
  return (
    <div style={{ alignItems: "center", display: "flex" }}>
      <svg
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        width={size}
        xmlns="http://www.w3.org/2000/svg"
      >
        {value === 1 && ( // Plus
          <>
            <line
              stroke="black"
              strokeWidth={2}
              x1={size / 2}
              x2={size / 2}
              y1={0}
              y2={size}
            />
            <line
              stroke="black"
              strokeWidth={2}
              x1={0}
              x2={size}
              y1={size / 2}
              y2={size / 2}
            />
          </>
        )}
        {value === 2 && ( // Empty rectangle
          <rect
            fill="none"
            height={size}
            stroke="black"
            strokeWidth={2}
            width={size}
          />
        )}
        {value === 3 && ( // Filled rectangle
          <rect height={size} stroke="black" strokeWidth={2} width={size} />
        )}
        {value === 4 && ( // Minus
          <>
            <line
              stroke="black"
              strokeWidth={2}
              x1={0}
              x2={size}
              y1={size / 2}
              y2={size / 2}
            />
          </>
        )}
      </svg>
    </div>
  );
}

export default SoilIcon;
