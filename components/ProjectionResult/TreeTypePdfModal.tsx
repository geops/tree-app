import { Button } from "@headlessui/react";

import PdfViewer from "../PdfViewer";
import Modal, { TriggerProps } from "../ui/Modal";

interface Props {
  href: string;
  triggerProps?: Record<string, unknown>;
}

function ModalTrigger({ children, onClick }: TriggerProps) {
  return <Button onClick={onClick}>{children}</Button>;
}

function TreeTypePdfModal({ href, triggerProps }: Props) {
  return (
    <Modal
      body={<PdfViewer href={href} />}
      title={"PDF Viewer"}
      Trigger={ModalTrigger}
      triggerProps={triggerProps}
      unmount={true}
    />
  );
}

export default TreeTypePdfModal;
