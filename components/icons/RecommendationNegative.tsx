import type { IconProps } from "@/utils/types/definitions";

function NegativeIcon({ className, color = "currentColor" }: IconProps) {
  return (
    <svg
      className={className}
      fill={color}
      height="21"
      viewBox="0 0 18 21"
      width="18"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9 2V19M9 19L16 11.8222M9 19L2 11.8222"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="4"
      />
    </svg>
  );
}

export default NegativeIcon;
