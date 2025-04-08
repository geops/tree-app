import { useEffect, useState } from "react";

import type { ReactNode } from "react";

export type MessageType = "error" | "info" | "success" | "warning";

interface Props {
  children: ReactNode;
  className?: string;
  onTimeout?: () => void;
  timeout?: number;
  type?: MessageType;
}

function getMessageStyle(type?: string) {
  switch (type) {
    case "error":
      return "bg-red-100 border-red-400 text-red-700";
    case "info":
      return "bg-blue-100 border-blue-400 text-blue-700";
    case "success":
      return "bg-green-100 border-green-400 text-green-700";
    case "warning":
      return "bg-yellow-100 border-yellow-400 text-yellow-700";
    default:
      return "border-gray-400 bg-[#f8f8f9] text-black";
  }
}

let messageTimeout: ReturnType<typeof setTimeout>;

function Message({ children, className, onTimeout, timeout, type }: Props) {
  const messageStyle = getMessageStyle(type);
  const [showMessage, setShowMessage] = useState<boolean>(true);
  useEffect(() => {
    clearTimeout(messageTimeout);
    if (timeout) {
      messageTimeout = setTimeout(() => {
        setShowMessage(false);
        onTimeout?.();
      }, timeout);
    }
  }, [timeout, onTimeout]);
  return showMessage ? (
    <div
      className={`min-h- w-full rounded-lg border px-6 py-4 text-base ${messageStyle} ${className}`}
    >
      {children}
    </div>
  ) : null;
}

export default Message;
