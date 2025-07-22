"use client";
import {
  DialogPanel,
  DialogTitle,
  Dialog as HUIDialog,
} from "@headlessui/react";
import { CloseButton } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";

import type { ReactNode } from "react";

export interface DialogProps {
  body?: null | ReactNode | ReactNode[];
  children?: null | ReactNode | ReactNode[];
  className?: string;
  footer?: null | ReactNode | ReactNode[];
  header?: null | ReactNode | ReactNode[];
  modal?: boolean;
  onClose?: (() => void) | null;
  open?: boolean;
  title?: null | string;
  unmount?: boolean;
}

export default function Dialog({
  body = null,
  children = null,
  className = "",
  footer = null,
  header = null,
  modal = true,
  onClose = null,
  open = false,
  title = null,
  unmount = false,
  ...otherProps
}: DialogProps) {
  const { t } = useTranslation();
  const content = useMemo(() => {
    return (
      <DialogPanel
        className={`data-[closed]:transform-[scale(95%)] w-full rounded-lg bg-white duration-300 ease-out data-[closed]:opacity-0 sm:max-w-9/10 md:max-w-4xl lg:max-w-5xl xl:max-w-6xl ${className}`}
      >
        <div className="relative flex max-h-[98vh] flex-col overflow-auto">
          <CloseButton
            className="absolute right-1 top-1 h-10 w-10 p-2 text-gray-700"
            onClick={() => onClose?.()}
            title={t("app.close")}
          >
            <XMarkIcon />
          </CloseButton>
          {children ? (
            children
          ) : (
            <>
              {(header ?? title) && (
                <>
                  {header ? (
                    header
                  ) : (
                    <DialogTitle className="m-0 px-6 py-4 pr-8">
                      {title}
                    </DialogTitle>
                  )}
                  <hr />
                </>
              )}
              {body && <div className="min-h-32 overflow-auto p-2">{body}</div>}
              {footer && (
                <>
                  <hr />
                  <div className="rounded-b-lg bg-[#f9fafb] p-2">{footer}</div>
                </>
              )}
            </>
          )}
        </div>
      </DialogPanel>
    );
  }, [children, onClose, title, body, footer, header, className, t]);
  return (
    <HUIDialog
      as="div"
      className={`relative z-50 h-full w-full focus:outline-none`}
      data-testid="dialog"
      onClose={() => onClose?.()}
      open={open}
      unmount={unmount}
      {...otherProps}
    >
      {modal ? (
        <div className="fixed inset-0 z-50 w-screen overflow-y-auto bg-black/85">
          <div className="flex min-h-full items-center justify-center p-2">
            {content}
          </div>
        </div>
      ) : (
        content
      )}
    </HUIDialog>
  );
}
