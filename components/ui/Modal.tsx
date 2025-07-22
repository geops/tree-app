import { createContext, useCallback, useContext, useState } from "react";

import Dialog from "./Dialog";
import InfoButton from "./InfoButton";

import type { FC } from "react";

import type { DialogProps } from "./Dialog";

export interface TriggerProps extends React.HTMLAttributes<HTMLButtonElement> {
  onClick: () => void;
}

interface Props extends DialogProps {
  onClick?: () => void;
  Trigger?: FC<TriggerProps> | null;
  triggerProps?: Record<string, unknown>;
}

const ModalContext = createContext<
  | {
      closeModal: () => void;
      openModal: () => void;
    }
  | undefined
>(undefined);

export const useModalContext = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModalContext must be used within a Modal");
  }
  return context;
};

function Modal({
  children,
  className,
  footer,
  onClick,
  onClose,
  title,
  Trigger = InfoButton,
  triggerProps = {},
  ...otherProps
}: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const closeModal = useCallback(() => {
    setIsOpen(false);
    onClose?.();
  }, [onClose]);
  const openModal = useCallback(() => {
    setIsOpen(true);
    onClick?.();
  }, [onClick]);

  return (
    <>
      {Trigger && <Trigger onClick={openModal} {...triggerProps} />}
      <ModalContext.Provider value={{ closeModal, openModal }}>
        <Dialog
          body={<div className="p-4 text-lg">{children}</div>}
          className={className}
          footer={footer}
          onClose={closeModal}
          open={isOpen}
          title={title}
          {...otherProps}
        />
      </ModalContext.Provider>
    </>
  );
}

export default Modal;
