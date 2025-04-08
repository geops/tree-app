import { Button, CloseButton, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/16/solid";
import { useCallback, useEffect, useState } from "react";
import { toast, Toast } from "react-hot-toast";

const intervals: Record<string, NodeJS.Timeout> = {};

function isPositiveInteger(value: number): boolean {
  return Number.isInteger(value) && value > 0;
}

function TreeToast({
  duration = 20,
  id,
  instance,
  message = "",
  onClick = null,
}: {
  duration?: number;
  id: string;
  instance: Toast;
  message: string;
  onClick?: (() => void) | null;
}) {
  const visible = instance.visible;
  const [progress, setProgress] = useState(100);

  const dismiss = useCallback(() => {
    clearInterval(intervals[id]);
    toast.dismiss(id);
  }, [id]);

  useEffect(() => {
    if (progress === 0) {
      dismiss();
    }
  }, [progress, dismiss]);

  const triggerHide = isPositiveInteger(duration)
    ? () => {
        clearInterval(intervals[id]);
        intervals[id] = setInterval(() => {
          setProgress((prev) => prev - 1);
        }, duration);
      }
    : undefined;

  return (
    <Transition
      appear
      enter="transition-transform duration-200"
      enterFrom="transform translate-x-full"
      enterTo="transform translate-x-0"
      leave="transition-transform duration-200"
      leaveFrom="transform translate-x-0"
      leaveTo="transform translate-x-full"
      show={visible}
    >
      <div
        className="relative w-80 overflow-hidden rounded-md bg-primary-500 p-4 text-white shadow-md"
        onMouseEnter={triggerHide}
        onTouchStart={triggerHide}
      >
        <CloseButton
          className="absolute right-0 top-0 h-6 w-6 p-1 text-white"
          onClick={dismiss}
        >
          <XMarkIcon />
        </CloseButton>
        {onClick ? (
          <Button className="w-full text-center" onClick={onClick}>
            {message}
          </Button>
        ) : (
          message
        )}
        <div
          className="absolute bottom-0 left-0 h-1 rounded-b-md bg-primary-100"
          style={{ width: isPositiveInteger(duration) ? `${progress}%` : 0 }}
        />
      </div>
    </Transition>
  );
}
export default TreeToast;
