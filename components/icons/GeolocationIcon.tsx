import type { IconProps } from "@/utils/types/definitions";

function GeolocationIcon({ className, color = "currentColor" }: IconProps) {
  return (
    <svg
      className={`h-4 w-4 ${className}`}
      version="1.1"
      viewBox="0 0 51.636 51.636"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M51.353,0.914c-0.295-0.305-0.75-0.39-1.135-0.213L0.583,23.481c-0.399,0.184-0.632,0.605-0.574,1.041
	s0.393,0.782,0.826,0.854l22.263,3.731l2.545,21.038c0.054,0.438,0.389,0.791,0.824,0.865c0.057,0.01,0.113,0.015,0.169,0.015
	c0.375,0,0.726-0.211,0.896-0.556l24-48.415C51.72,1.675,51.648,1.218,51.353,0.914z"
        fill={color}
      />
    </svg>
  );
}

export default GeolocationIcon;
