import React from 'react';
import { useTranslation } from 'react-i18next';
// eslint-disable-next-line import/no-unresolved
import { info } from 'lib/src';

import styles from './Diagram.module.css';
import { getStyle } from './utils';

function Soil() {
  const { i18n, t } = useTranslation();
  const data = {};
  return (
    <svg viewBox="0 0 800 470">
      <path d="M458 299h64v75h-64zM522 299h64v75h-64zM586 299h70v75h-70zM656 299h72v75h-72z" />
      <path d="M727 299h72v75h-72zM317 374h35v24h-35zM353 374h35v24h-35zM388 374h35v24h-35zM423 374h35v24h-35zM458 374h64v24h-64zM522 374h64v24h-64zM586 374h70v24h-70zM317 422h35v24h-35zM458 422h64v24h-64zM656 422h72v24h-72zM728 422h72v24h-72zM522 422h64v24h-64zM353 422h35v24h-35zM388 422h35v24h-35zM423 422h35v24h-35zM0 89h29v29H0zM0 130h29v29H0zM0 171h29v29H0zM0 212h29v29H0zM0 253h29v29H0zM229 299h88v75h-88zM317 299h35v75h-35zM353 299h35v75h-35zM388 299h35v75h-35zM423 299h35v75h-35z" />
      <text y="22" font-size="25.2">
        {t('forestTypeDiagram.soil.label')}
      </text>
      <text x="280" y="285" font-size="20.1" transform="rotate(-90 280 285)">
        {t('forestTypeDiagram.soil.rock')}
      </text>
      <text x="342" y="285" font-size="20.1" transform="rotate(-90 342 285)">
        {t('forestTypeDiagram.soil.ranker')}
      </text>
      <text x="376" y="285" font-size="20.1" transform="rotate(-90 376 285)">
        {t('forestTypeDiagram.soil.regosol')}
      </text>
      <text x="409" y="285" font-size="20.1" transform="rotate(-90 409 285)">
        {t('forestTypeDiagram.soil.pararendzina')}
      </text>
      <text x="443" y="285" font-size="20.1" transform="rotate(-90 443 285)">
        {t('forestTypeDiagram.soil.rendzina')}
      </text>
      <text x="496" y="285" font-size="20.1" transform="rotate(-90 496 285)">
        {t('forestTypeDiagram.soil.brown')}
      </text>
      <text x="563" y="285" font-size="20.1" transform="rotate(-90 563 285)">
        {t('forestTypeDiagram.soil.paraBrown')}
      </text>
      <text x="618" y="285" font-size="20.1" transform="rotate(-90 618 285)">
        {t('forestTypeDiagram.soil.podsol')}
      </text>
      <text x="641" y="285" font-size="18.2" transform="rotate(-90 640 285)">
        {t('forestTypeDiagram.soil.ironHumusPodsol')}
      </text>
      <text x="688" y="285" font-size="20.1" transform="rotate(-90 688 285)">
        {t('forestTypeDiagram.soil.tailwater')}
      </text>
      <text x="710" y="285" font-size="18.2" transform="rotate(-90 710 285)">
        {t('forestTypeDiagram.soil.tailwaterPseudo')}
      </text>
      <text x="755" y="285" font-size="20.1" transform="rotate(-90 755 285)">
        {t('forestTypeDiagram.soil.groundwater')}
      </text>
      <text x="777" y="285" font-size="18.2" transform="rotate(-90 777 285)">
        {t('forestTypeDiagram.soil.groundwaterGley')}
      </text>
      <text x="297" y="59" font-size="18">
        {t('forestTypeDiagram.soil.raw')}
      </text>
      <text x="483" y="59" font-size="18">
        {t('forestTypeDiagram.soil.developed')}
      </text>
      <text x="660" y="59" font-size="18">
        {t('forestTypeDiagram.soil.wet')}
      </text>
      <text x="40" y="107" font-size="20.1">
        {t('forestTypeDiagram.soil.organic')}
      </text>
      <text x="40" y="150" font-size="20.1">
        {t('forestTypeDiagram.soil.riverside')}
      </text>
      <text x="40" y="193" font-size="20.1">
        {t('forestTypeDiagram.soil.neutralBrown')}
      </text>
      <text x="40" y="236" font-size="20.1">
        {t('forestTypeDiagram.soil.brownPodsol')}
      </text>
      <text x="40" y="279" font-size="20.1">
        {t('forestTypeDiagram.soil.humusPodsol')}
      </text>
      <path
        fill="none"
        stroke="#231f20"
        stroke-width=".7"
        d="M0 89h29v29H0zM0 130h29v29H0zM0 171h29v29H0zM0 212h29v29H0zM0 253h29v29H0z"
      />
      <text x="488" y="463" font-size="17">
        {t('forestTypeDiagram.soil.podsoled')}
      </text>
      <text x="352" y="463" font-size="17">
        {t('forestTypeDiagram.soil.browned')}
      </text>
      <text x="680" y="463" font-size="17">
        {t('forestTypeDiagram.soil.bleached')}
      </text>
      <text x="236" y="392" font-size="17">
        {t('forestTypeDiagram.soil.weted')}
      </text>
      <path fill="none" stroke="#231f20" stroke-width=".8" d="M317 422v24" />
      <path
        fill="none"
        stroke="#231f20"
        stroke-width="1.4"
        d="M229 46v329M229 374h570M799 46v329"
      />
      <path
        fill="none"
        stroke="#231f20"
        stroke-width=".8"
        d="M229 299h570M317 141v258M656 46v353M458 46v353M586 141v257M800 422v24M317 398h339M656 422h144M656 446h144M458 422v24M586 422v24M656 422v24M317 422h270M317 446h270"
      />
    </svg>
  );
}

export default Soil;
