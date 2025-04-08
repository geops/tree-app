import type { IconProps } from "@/utils/types/definitions";

function PositiveIcon({ className, color = "currentColor" }: IconProps) {
  return (
    <svg
      className={className}
      fill="none"
      height="21"
      viewBox="0 0 18 21"
      width="18"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9 19V2M9 2L16 9.17778M9 2L2 9.17778"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="4"
      />
    </svg>
  );
}

export default PositiveIcon;
