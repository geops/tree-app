import type { IconProps } from "@/utils/types/definitions";

function MapIcon({ className = "", color = "currentColor" }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 91.8 82.2"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M89.8 10.6L69.4.6a3.5 3.5 0 00-1.2-.3 2.6 2.6 0 00-.4 0h-.1a3.7 3.7 0 00-1.3.3L46 9.4 27 .7l-.3-.2a3.5 3.5 0 00-3.3-.2L2.1 10a3.5 3.5 0 00-2 3.2l.3 65A3.5 3.5 0 002 81a3.5 3.5 0 003.3.3l19.5-9.1 19.4 9.3a3 3 0 00.3.2 3.5 3.5 0 003.4.2l20-9.7 19 8.4a3.5 3.5 0 004.9-3.2V13.7a3.5 3.5 0 00-2-3.1zM7 15.4l14.9-6.7v57.1L7.3 72.6zm21.9-6.2l14 6.5V73l-14-6.7zm21 6.1l14.5-6.2v57.1l-14.5 7zM84.8 72l-13.4-5.9V9.4l13.4 6.5z"
        data-name="Ebene 2"
        fill={color}
      ></path>
    </svg>
  );
}

export default MapIcon;
