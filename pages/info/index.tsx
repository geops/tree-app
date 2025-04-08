import { useMemo } from "react";
import { useTranslation } from "react-i18next";

import InfoAbout from "@/components/infos/InfoAbout";
import InfoBasel from "@/components/infos/InfoBasel";
import InfoBugs from "@/components/infos/InfoBugs";
import InfoContact from "@/components/infos/InfoContact";
import InfoGlossary from "@/components/infos/InfoGlossary";
import InfoImpressum from "@/components/infos/InfoImpressum";
import InfoLocation from "@/components/infos/InfoLocation";
import InfoLucerne from "@/components/infos/InfoLucerne";
import InfoParticipants from "@/components/infos/InfoParticipants";
import InfoRecommendation from "@/components/infos/InfoRecommendation";
import InfoReports from "@/components/infos/InfoReports";
import InfoSolothurn from "@/components/infos/InfoSolothurn";
import InfoUsage from "@/components/infos/InfoUsage";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import LatinSwitcher from "@/components/LatinSwitcher";
import ProfileSelect from "@/components/ProfileSelect";
import Accordion from "@/components/ui/Accordion";
import useStore from "@/store";

function Info() {
  const { t } = useTranslation();
  const activeProfile = useStore((state) => state.activeProfile);
  const infos = useMemo(() => {
    const items = [
      {
        content: <InfoAbout />,
        key: "info.about",
        title: t("info.aboutTitle"),
      },
      {
        content: (
          <div className="flex flex-col gap-6">
            <LanguageSwitcher />
            <ProfileSelect className="max-w-60" />
            <LatinSwitcher />
          </div>
        ),
        key: "info.language&profile",
        title: (
          <>
            {t("app.language")} &amp; {t("app.profile")}
          </>
        ),
      },
      {
        content: <InfoUsage />,
        key: "info.usage",
        title: t("info.usageTitle"),
      },
      {
        content: <InfoLocation />,
        key: "info.location",
        title: t("info.locationTitle"),
      },
      {
        content: <InfoRecommendation />,
        key: "info.recommendation",
        title: t("info.recommendationTitle"),
      },
      {
        content: <InfoGlossary />,
        key: "info.glossary",
        title: t("info.glossaryTitle"),
      },
      {
        content: <InfoParticipants />,
        key: "info.participants",
        title: t("info.participantsTitle"),
      },
      {
        content: <InfoReports />,
        key: "info.reports",
        title: t("info.reportsTitle"),
      },
      {
        content: <InfoImpressum />,
        key: "info.impressum",
        title: t("info.impressumTitle"),
      },
      {
        content: t("info.disclaimer"),
        key: "info.disclaimer",
        title: t("info.disclaimerTitle"),
      },
      {
        content: <InfoContact />,
        key: "info.contact",
        title: t("info.contactTitle"),
      },
      {
        content: (
          <div dangerouslySetInnerHTML={{ __html: t("info.changelog") }} />
        ),
        key: "info.changelog",
        title: t("info.changelogTitle"),
      },
      {
        content: <InfoBugs />,
        key: "info.bugs",
        title: t("info.bugsTitle"),
      },
    ];

    if (activeProfile === "lu") {
      items.splice(
        items.findIndex((item) => item.key === "info.language&profile") + 1,
        0,
        {
          content: <InfoLucerne />,
          key: "info.lu",
          title: t(InfoLucerne.title),
        },
      );
    }

    if (activeProfile === "bl") {
      items.splice(
        items.findIndex((item) => item.key === "info.language&profile") + 1,
        0,
        {
          content: <InfoBasel />,
          key: "info.bl",
          title: t(InfoBasel.title),
        },
      );
    }

    if (activeProfile === "so") {
      items.splice(
        items.findIndex((item) => item.key === "info.language&profile") + 1,
        0,
        {
          content: <InfoSolothurn />,
          key: "info.so",
          title: t(InfoSolothurn.title),
        },
      );
    }
    return items;
  }, [activeProfile, t]);

  return (
    <div className="overflow-hidden p-5">
      <Accordion items={infos} scrollInoView />
    </div>
  );
}

export default Info;
