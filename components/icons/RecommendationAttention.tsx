import type { IconProps } from "@/utils/types/definitions";

interface AttentionIconProps extends IconProps {
  inverted?: boolean;
}

function AttentionIcon({
  className,
  color = "currentColor",
  inverted,
}: AttentionIconProps) {
  return (
    <svg
      className={className}
      height="23"
      viewBox="-3 0 34 25"
      width="28"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.2916 2.80665L1.85037 19.9601C1.03911 21.2929 1.99848 23 3.55877 23H24.4412C26.0015 23 26.9609 21.2929 26.1496 19.9601L15.7084 2.80665C14.9292 1.52651 13.0708 1.52651 12.2916 2.80665Z"
        fill={inverted ? "white" : color}
      />
      <path
        d="M12.64 7.3999H15.48L15.28 16.7399H13.04L12.64 7.3999ZM14.16 21.1399C13.7067 21.1399 13.3133 20.9799 12.98 20.6599C12.66 20.3399 12.5 19.9532 12.5 19.4999C12.5 19.0332 12.66 18.6399 12.98 18.3199C13.3133 17.9999 13.7067 17.8399 14.16 17.8399C14.6267 17.8399 15.02 17.9999 15.34 18.3199C15.66 18.6399 15.82 19.0332 15.82 19.4999C15.82 19.9532 15.6533 20.3399 15.32 20.6599C15 20.9799 14.6133 21.1399 14.16 21.1399Z"
        fill={inverted ? color : "white"}
      />
    </svg>
  );
}

export default AttentionIcon;
