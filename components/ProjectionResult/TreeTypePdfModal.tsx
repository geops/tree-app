import { Button as HuiButton } from "@headlessui/react";

import PdfViewer from "../PdfViewer";
import Button from "../ui/Button";
import Modal, { TriggerProps, useModalContext } from "../ui/Modal";

interface Props {
  href: string;
  name: string;
  triggerProps?: Record<string, unknown>;
}

function ModalTrigger({ children, onClick }: TriggerProps) {
  return <HuiButton onClick={onClick}>{children}</HuiButton>;
}

function Footer() {
  const { closeModal } = useModalContext();
  return (
    <div className="flex justify-end">
      <Button onClick={closeModal} variant="secondary">
        OK
      </Button>
    </div>
  );
}

function TreeTypePdfModal({ href, name, triggerProps }: Props) {
  return (
    <Modal
      body={<PdfViewer href={href} />}
      footer={<Footer />}
      title={name}
      Trigger={ModalTrigger}
      triggerProps={triggerProps}
      unmount={true}
    />
  );
}

export default TreeTypePdfModal;
