import type { IconProps } from "@/utils/types/definitions";

export interface InfoIconProps extends IconProps {
  circle?: boolean;
}

function InfoIcon({
  circle = false,
  className = "",
  color = "currentColor",
}: InfoIconProps) {
  return (
    <svg
      className={className}
      height="22"
      viewBox="0 0 5.794 5.794"
      width="22"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g fill={color}>
        {circle && (
          <path d="M2.895 0a2.897 2.897 0 1 0 2.9 2.897A2.9 2.9 0 0 0 2.894 0Zm0 5.26A2.363 2.363 0 1 1 5.26 2.897 2.365 2.365 0 0 1 2.895 5.26z" />
        )}
        <path
          d="M10.95 7.455a1.46 1.46 0 1 0-1.482-1.47 1.46 1.46 0 0 0 1.482 1.47ZM12.19 11.286V8.794H8.415v2.492H9.71v3.018H8.415v2.48h5.07v-2.48H12.19z"
          transform="scale(.26458)"
        />
      </g>
    </svg>
  );
}

export default InfoIcon;
