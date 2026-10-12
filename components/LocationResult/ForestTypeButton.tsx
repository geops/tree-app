import { useRouter } from "next/router";

import useStore from "@/store";

import Button, { ButtonProps } from "../ui/Button";

interface ForestTypeButtonProps extends ButtonProps {
  code: string;
}

export default function ForestTypeButton({
  children,
  className,
  code,
  disabled,
  ...props
}: ForestTypeButtonProps) {
  const setFormLocation = useStore((state) => state.setFormLocation);
  const setProjectionMode = useStore((state) => state.setProjectionMode);
  const router = useRouter();
  return (
    <Button
      className={className}
      disabled={disabled}
      onClick={() => {
        setProjectionMode("f");
        setFormLocation({ forestType: code });
        void router.push(`/projection${window.location.search}`);
      }}
      {...props}
    >
      {children}
    </Button>
  );
}
