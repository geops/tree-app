function ManualIcon({
  className = "",
  color = "currentColor",
}: {
  className?: string;
  color?: string;
}) {
  return (
    <svg
      className={className}
      viewBox="0 0 81.72 87.78"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g data-name="Ebene 2">
        <path
          d="M57.61 43.66A3.33 3.33 0 0 0 54.28 47v34.12H6.66V14.68h35.63a3.33 3.33 0 0 0 0-6.66h-39A3.33 3.33 0 0 0 0 11.35v73.1a3.33 3.33 0 0 0 3.33 3.33h54.28a3.33 3.33 0 0 0 3.33-3.33V47a3.33 3.33 0 0 0-3.33-3.34z"
          fill={color}
        />
        <path
          d="M80.65 8.48L72.85 1a3.49 3.49 0 0 0-4.92.07l-41.6 42.3a3.39 3.39 0 0 0-.76 1.15l-4.9 12.31a3.5 3.5 0 0 0 3.25 4.79 3.46 3.46 0 0 0 1.22-.22l12.7-4.7a3.49 3.49 0 0 0 1.28-.83l41.6-42.4a3.5 3.5 0 0 0-.07-5zm-46 41.91l-4.59 1.7 1.73-4.34 38.7-39.33 2.76 2.65z"
          fill={color}
        />
      </g>
    </svg>
  );
}
export default ManualIcon;
