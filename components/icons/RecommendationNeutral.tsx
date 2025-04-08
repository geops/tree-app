import type { IconProps } from "@/utils/types/definitions";

function NeutralIcon({ className, color = "currentColor" }: IconProps) {
  return (
    <svg
      className={className}
      fill="none"
      height="14"
      viewBox="0 0 19 12"
      width="18"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2 7.33333L6.45455 12L16 2"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="4"
      />
    </svg>
  );
}

export default NeutralIcon;
