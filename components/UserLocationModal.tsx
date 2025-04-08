import { Field, Textarea } from "@headlessui/react";
import { usePathname } from "next/navigation";
import { Coordinate } from "ol/coordinate";
import { transform } from "ol/proj";
import { useRef, useState } from "react";
import { Trans, useTranslation } from "react-i18next";

import { UserLocationResponse } from "@/pages/api/userlocations";
import useStore from "@/store";
import { params, Params } from "@/store/middleware/querySync";
import useFetch from "@/utils/hooks/useFetch";
import useIsOnline from "@/utils/hooks/useIsOnline";

import SaveIcon from "./icons/SaveIcon";
import Spinner from "./icons/Spinner";
import Button from "./ui/Button";
import Label from "./ui/Label";
import Message, { MessageType } from "./ui/Message";
import Modal, { useModalContext } from "./ui/Modal";

const formQueryParams: string[] = Object.keys(params).reduce((final, key) => {
  const { selector } = params[key as keyof Params];
  if (selector === "formLocation") {
    final.push(key);
  }
  return final;
}, [] as string[]);

let abortController = new AbortController();

function getQueryString(coord: Coordinate): string {
  const { formLocation, location, mapLocation } = useStore.getState();
  const urlSearchParams = new URLSearchParams(window.location.search);
  const urlSearchEntries = urlSearchParams.entries().toArray();
  const formUrlEntries = urlSearchEntries.filter(([key]) =>
    formQueryParams.includes(key),
  );

  if (
    !formUrlEntries.find(([key]) => key === "flfe") &&
    mapLocation.forestEcoregion
  ) {
    formUrlEntries.push(["flfe", mapLocation.forestEcoregion]);
  }
  if (
    !formUrlEntries.find(([key]) => key === "flaz") &&
    mapLocation.altitudinalZone
  ) {
    formUrlEntries.push(["flaz", mapLocation.altitudinalZone]);
  }
  if (
    !formUrlEntries.find(([key]) => key === "flft") &&
    mapLocation.forestType
  ) {
    formUrlEntries.push(["flft", mapLocation.forestType]);
  }
  if (
    !formUrlEntries.find(([key]) => key === "flt") &&
    mapLocation.transition
  ) {
    formUrlEntries.push(["flt", mapLocation.transition ? "t" : "f"]);
  }
  if (
    !formUrlEntries.find(([key]) => key === "fltft") &&
    mapLocation.transitionForestType
  ) {
    formUrlEntries.push(["fltft", mapLocation.transitionForestType]);
  }
  if (
    !formUrlEntries.find(([key]) => key === "fltraz") &&
    mapLocation.transitionAltitudinalZone
  ) {
    formUrlEntries.push(["fltraz", mapLocation.transitionAltitudinalZone]);
  }
  if (
    !formUrlEntries.find(([key]) => key === "fltaz") &&
    location.targetAltitudinalZone
  ) {
    formUrlEntries.push([
      "fltaz",
      location.targetAltitudinalZone ?? formLocation.targetAltitudinalZone,
    ]);
  }
  if (
    !formUrlEntries.find(([key]) => key === "flsfa") &&
    mapLocation.silverFirArea
  ) {
    formUrlEntries.push(["flsfa", mapLocation.silverFirArea]);
  }
  const queryString = formUrlEntries.reduce(
    (acc, [key, value]) => {
      return `${acc}&${key}=${value}`;
    },
    `?ml=ft,cb,ul&mv=16|${coord.join("|")}`,
  );

  return queryString;
}

function ModalTrigger({ onClick }: { onClick: () => void }) {
  const { t } = useTranslation();
  const online = useIsOnline();
  const pathName = usePathname();
  const mapLocation = useStore((state) => state.mapLocation);
  const projectionMode = useStore((state) => state.projectionMode);
  const hidden =
    projectionMode !== "f" ||
    !mapLocation?.coordinate ||
    !online ||
    !/(\/|\/projection)$/.test(pathName);

  return !hidden ? (
    <Button onClick={onClick}>
      <span className="flex items-center gap-2">
        <SaveIcon />
        {t("userLocations.save")}
      </span>
    </Button>
  ) : null;
}

interface Message {
  content: string;
  type: MessageType;
}

function ModalContent({
  message,
  setMessage,
}: {
  message?: Message | null;
  setMessage: (message: Message | null) => void;
}) {
  const { t } = useTranslation();
  const creatorRef = useRef<HTMLTextAreaElement>(null);
  const commentRef = useRef<HTMLTextAreaElement>(null);
  const { closeModal } = useModalContext();
  const setUserLocations = useStore((state) => state.setUserLocations);
  const mapLocation = useStore((state) => state.mapLocation);
  const activeProfile = useStore((state) => state.activeProfile);
  const { fetchData, isLoading } = useFetch<UserLocationResponse>();

  return (
    <div className="mt-8 flex flex-col gap-4">
      {message?.type === "success" ? (
        <>
          <Message type={message.type}>{t(message.content)}</Message>
          <Button
            className="w-full"
            onClick={() => {
              closeModal();
              setMessage(null);
            }}
            variant="secondary"
          >
            {t("app.close")}
          </Button>
        </>
      ) : (
        <>
          <span>
            <Trans i18nKey="userLocations.infoLayer" />
          </span>
          {t("userLocations.confirm")}
          <Field>
            <Label>{t("userLocations.creatorLabel")}</Label>
            <Textarea
              className="w-full rounded-lg border border-primary-500 p-2"
              ref={creatorRef}
              rows={1}
            />
          </Field>
          <Field>
            <Label>{t("userLocations.commentLabel")}</Label>
            <Textarea
              className="w-full rounded-lg border border-primary-500 p-2"
              ref={commentRef}
              rows={3}
            />
          </Field>
          <Button
            className="w-full"
            disabled={isLoading}
            onClick={() => {
              const wg3857Coordinate = transform(
                mapLocation.coordinate,
                "EPSG:2056",
                "EPSG:3857",
              );

              const queryString = getQueryString(mapLocation.coordinate);

              abortController.abort();
              abortController = new AbortController();

              void fetchData(`/api/userlocations`, {
                body: JSON.stringify({
                  data: [
                    {
                      comment: commentRef.current?.value,
                      coordinate: wg3857Coordinate,
                      creator: creatorRef.current?.value,
                      querystring: queryString,
                    },
                  ],
                  profile: activeProfile,
                }),
                headers: {
                  "Content-Type": "application/json",
                },
                method: "PUT",
                signal: abortController.signal,
              })
                .then((jsonData) => {
                  setUserLocations(jsonData.data!);
                  setMessage({
                    content: `${t("userLocations.success") as string}`,
                    type: "success",
                  });
                })
                .catch((err) => {
                  setMessage({
                    content: `${t("userLocations.error") as string} ${err}`,
                    type: "error",
                  });
                });
            }}
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2 text-black">
                <Spinner />
                {t("userLocations.loading")}
              </span>
            ) : (
              t("userLocations.save")
            )}
          </Button>
          <Button
            className="w-full"
            disabled={isLoading}
            onClick={closeModal}
            variant="secondary"
          >
            {t("forestType.cancel")}
          </Button>
          {message && (
            <Message className="mt-4" type={message.type}>
              {t(message.content)}
            </Message>
          )}
        </>
      )}
    </div>
  );
}

function UserLocationModal() {
  const { t } = useTranslation();
  const [message, setMessage] = useState<Message | null>(null);
  return (
    <Modal
      className="!max-w-[380px]"
      onClose={() => setMessage(null)}
      Trigger={ModalTrigger}
    >
      <div className="mb-4 mt-[-10px] flex h-12 w-12 items-center justify-center rounded-full bg-[rgba(231,247,248,1)]">
        <SaveIcon className="text-primary-500" />
      </div>
      <h2>{t("userLocations.saveEntry")}?</h2>
      <ModalContent message={message} setMessage={setMessage} />
    </Modal>
  );
}

export default UserLocationModal;
