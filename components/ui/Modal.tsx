import { createContext, useContext, useState } from "react";

import Dialog from "./Dialog";
import InfoButton from "./InfoButton";

import type { FC } from "react";

import type { DialogProps } from "./Dialog";

interface Props extends DialogProps {
  onClick?: () => void;
  Trigger?: FC<{ onClick: () => void }> | null;
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
  ...otherProps
}: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const closeModal = () => {
    setIsOpen(false);
    onClose?.();
  };
  const openModal = () => {
    setIsOpen(!isOpen);
    onClick?.();
  };

  return (
    <>
      {Trigger && <Trigger onClick={openModal} />}
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
