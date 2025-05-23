import type { IconProps } from "@/utils/types/definitions";

function Location({ className = "", color = "currentColor" }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 12.88 17.75"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.64 5.18l-.22-.22-2.93-2.94L7.73.24 7.49 0H1.1A1.1 1.1 0 000 1.1v15.55a1.1 1.1 0 001.1 1.1h10.67a1.1 1.1 0 001.1-1.1V5.42zM7.97 2.8l2.13 2.14H7.97zM1.64 16.12V1.64h4.69v4.94h4.91v9.54z"
        fill={color}
      />
      <path d="M3.59 12.84h5.68v1.64H3.59z" fill={color} />
    </svg>
  );
}

export default Location;
