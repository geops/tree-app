import { Trans, useTranslation } from "react-i18next";

import EarthExtremeIcon from "../icons/EarthExtreme";
import EarthModerateIcon from "../icons/EarthModerate";
import EarthTodayIcon from "../icons/EarthToday";
import AttentionIcon from "../icons/RecommendationAttention";
import NegativeIcon from "../icons/RecommendationNegative";
import NeutralIcon from "../icons/RecommendationNeutral";
import PositiveIcon from "../icons/RecommendationPositive";

const statusIconStyle =
  "absolute -left-14 p-1 h-10 w-10 rounded-full bg-primary-500 text-white";

function InfoRecommendation() {
  const { t } = useTranslation();
  return (
    <Trans
      i18nKey="info.recommendation"
      values={{
        attentionTitle: t("help.recommendationAttentionHeader"),
        negativeTitle: t("help.recommendationNegativeHeader"),
        neutralTitle: t("help.recommendationNeutralHeader"),
        positiveTitle: t("help.recommendationPositiveHeader"),
      }}
    >
      <p>general description</p>
      <p>
        <strong>recommendation</strong> description
      </p>
      <ul className="mb-5 flex flex-col gap-5">
        <li className="relative ml-14">
          <PositiveIcon className={statusIconStyle} /> <p>positiveTitle</p>:{" "}
          <Trans i18nKey="help.recommendationPositive">help text</Trans>
        </li>
        <li className="relative ml-14">
          <NeutralIcon className={statusIconStyle} /> <p>neutralTitle</p>:{" "}
          <Trans i18nKey="help.recommendationNeutral">help text</Trans>
        </li>
        <li className="relative ml-14">
          <NegativeIcon className={statusIconStyle} /> <p>negativeTitle</p>:{" "}
          <Trans i18nKey="help.recommendationNegative">help text</Trans>
        </li>
        <li className="relative ml-14">
          <AttentionIcon
            className={`${statusIconStyle} !text-primary-500`}
            inverted
          />{" "}
          <p>attentionTitle</p>:{" "}
          <Trans i18nKey="help.recommendationAttention">
            help text{" "}
            <a
              href="https://www.bafu.admin.ch/bafu/de/home/themen/wald/publikationen-studien/publikationen/vollzugshilfe-waldschutz.html"
              rel="noopener noreferrer"
              target="_blank"
            >
              link
            </a>
          </Trans>
        </li>
      </ul>
      <p>description</p>
      <h3 className="text-lg font-bold">scenarios</h3>
      <p>description</p>
      <ul className="mb-5 flex flex-col gap-5">
        <li className="grid grid-cols-[50px_auto] items-center gap-2">
          <EarthTodayIcon className="h-12 w-10 text-primary-500" /> today
        </li>
        <li className="grid grid-cols-[50px_auto] items-center gap-2">
          <EarthModerateIcon className="h-11 text-primary-500" /> moderate
        </li>
        <li className="grid grid-cols-[50px_auto] items-center gap-2">
          <EarthExtremeIcon className="h-11 text-primary-500" /> extreme
        </li>
      </ul>
      <p>tabs</p>
      <ul className="mb-5 flex list-disc flex-col gap-5 pl-8">
        <li>three</li>
        <li>one</li>
        <li>two</li>
      </ul>
      <p>description</p>
    </Trans>
  );
}

export default InfoRecommendation;
