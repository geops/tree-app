import type { IconProps } from "@/utils/types/definitions";

function LayersIcon({ className, color = "currentColor" }: IconProps) {
  return (
    <svg
      className={className}
      fill="none"
      height="20"
      viewBox="0 0 20 20"
      width="20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_84_766)">
        <path
          d="M1.6665 9.99997L9.7017 14.0176C9.81101 14.0722 9.86567 14.0996 9.923 14.1103C9.97378 14.1198 10.0259 14.1198 10.0767 14.1103C10.134 14.0996 10.1887 14.0722 10.298 14.0176L18.3332 9.99997M1.6665 14.1666L9.7017 18.1842C9.81101 18.2389 9.86567 18.2662 9.923 18.277C9.97378 18.2865 10.0259 18.2865 10.0767 18.277C10.134 18.2662 10.1887 18.2389 10.298 18.1842L18.3332 14.1666M1.6665 5.83331L9.7017 1.81571C9.81101 1.76105 9.86567 1.73372 9.923 1.72297C9.97378 1.71344 10.0259 1.71344 10.0767 1.72297C10.134 1.73372 10.1887 1.76105 10.298 1.81571L18.3332 5.83331L10.298 9.8509C10.1887 9.90556 10.134 9.93289 10.0767 9.94365C10.0259 9.95317 9.97378 9.95317 9.923 9.94365C9.86567 9.93289 9.81101 9.90556 9.7017 9.8509L1.6665 5.83331Z"
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.66667"
        />
      </g>
      <defs>
        <clipPath id="clip0_84_766">
          <rect fill="white" height="20" width="20" />
        </clipPath>
      </defs>
    </svg>
  );
}

export default LayersIcon;
