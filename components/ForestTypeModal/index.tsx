import { DialogTitle } from "@headlessui/react";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";

import { TreeAppLanguage } from "@/i18n/i18next";
import useStore from "@/store";

import ProfileSelect from "../ProfileSelect";
import Button from "../ui/Button";
import Modal from "../ui/Modal";

import ForestTypeComparison from "./ForestTypeComparison";
import ForestTypeDescription from "./ForestTypeDescription";

import type {
  BlForestType,
  ForestType,
  LuForestType,
} from "@geops/tree-lib/types";

const modalModes = ["c", "d"];

function ForestTypeModalTitle() {
  const { i18n } = useTranslation();
  const tc = useStore((state) => state.treeClient);
  const activeProfile = useStore((state) => state.activeProfile);
  const forestTypeDescription = useStore(
    (state) => state.forestTypeDescription,
  );
  const title = useMemo(() => {
    if (!forestTypeDescription) return "";
    let name = "";
    let latinName = "";
    if (activeProfile === "lu") {
      const ftDetails = tc.getForestTypeByCode<LuForestType>(
        forestTypeDescription,
        undefined,
        activeProfile,
      );
      name = ftDetails?.de ?? "";
      latinName = ftDetails?.la ?? "";
    }
    if (activeProfile === "ch") {
      const ftDetails = tc.getForestTypeByCode<ForestType>(
        forestTypeDescription,
        undefined,
        activeProfile,
      );
      name =
        ftDetails?.[i18n.language as TreeAppLanguage] ?? ftDetails?.de ?? "";
      latinName = ftDetails?.la ?? "";
    }
    if (activeProfile === "bl") {
      const ftDetails = tc.getForestTypeByCode<BlForestType>(
        forestTypeDescription,
        undefined,
        activeProfile,
      );
      name = ftDetails?.de ?? "";
      latinName = ftDetails?.la ?? "";
    }

    return (
      <>
        <span>{`${forestTypeDescription}${name ? ` - ${name}` : ""}`}</span>
        {latinName && <i> {latinName}</i>}
      </>
    );
  }, [forestTypeDescription, i18n.language, tc, activeProfile]);

  return (
    <DialogTitle as="h2" className="m-0 p-4 pr-8">
      {title}
    </DialogTitle>
  );
}

function ForestTypeModal() {
  const { t } = useTranslation();
  const forestTypeModal = useStore((state) => state.forestTypeModal);
  const setForestTypeModal = useStore((state) => state.setForestTypeModal);

  return (
    <Modal
      body={
        <div className="w-full">
          {forestTypeModal === "c" ? (
            <ForestTypeComparison />
          ) : (
            <ForestTypeDescription />
          )}
        </div>
      }
      footer={
        <div className="flex items-end justify-between gap-6 sm:justify-end">
          <ProfileSelect portal={false} />
          <Button onClick={() => setForestTypeModal("")} variant="secondary">
            OK
          </Button>
        </div>
      }
      header={
        forestTypeModal === "c" ? (
          <DialogTitle as="h2" className="m-0 p-4 pr-8">
            {t("forestTypeModal.compare")}
          </DialogTitle>
        ) : (
          <ForestTypeModalTitle />
        )
      }
      onClose={() => setForestTypeModal("")}
      open={modalModes.includes(forestTypeModal)}
      Trigger={null}
    />
  );
}

export default ForestTypeModal;
