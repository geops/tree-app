import type { IconProps } from "@/utils/types/definitions";

function EarthToday({ className, color = "currentColor" }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24.8 24.8"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13.7 18.2c-.2.4-.9.5-1.2.4-.4-.1-1.1-.4-.8.2s1.3.8 1.5 1.5.3 1.1.7 1c.4 0 1.1 0 1.1-.6 0-.7.1-2.7-.2-2.8.1 0-.7-.4-1.1.3z"
        fill={color}
      />
      <path
        d="M12.4 7.7c-4.7 0-8.5 3.8-8.5 8.5s3.8 8.5 8.5 8.5 8.5-3.8 8.5-8.5c0-4.6-3.8-8.5-8.5-8.5zm0 15.4c-3.2 0-5.8-2.2-6.6-5.1.1 0 .1 0 .1-.1 0-.2.6-.7.7-.8.1-.1.2.7.7 1 .5.2.7-.3.6-.6-.1-.3 0-.9.2-1.2.1-.4.3-.8.3-1.2s-.3-.5-.6-.5-.6-.5-.7-.8c-.1-.2-.5-.4-.9-.5.2-.3.4-.7.6-1 .3.1.9.3.9.5.1.2.7 1 .9.4s.2-.4.2-.8c0-.3.2-1 .1-1.3l-.5-.5c1.1-.8 2.5-1.3 3.9-1.3 2.3 0 4.3 1.1 5.5 2.8-.4 0-1 .1-1.1.3-.1.4-2.1-.7-2.2-.3-.1.3-.1.5 0 .8s-.4 1.3-1.1 1.1c-.7-.2-1.3-.6-1.3-.2 0 .3-1.1.3-1.1.6s-.3.6 0 .9 1.3 1 1.3 1.5.2.5.6.5c.4 0 .4-.6.6-.8.2-.2.9-.7 1.1-.4.2.3.9-.1 1 .3s.2.5.1 1c0 .5-.3.6 0 .8.3.2.6.5.7 0s.4-.5.4-.9-.5-1.2.1-1.1c.6 0 1-.8 1.4 0 .3.6.3 1.7.5 2-.8 2.8-3.4 4.9-6.4 4.9z"
        fill={color}
      />
    </svg>
  );
}

export default EarthToday;
