import React from 'react';
import { useTranslation } from 'react-i18next';
// eslint-disable-next-line import/no-unresolved
import { info } from 'lib/src';

import styles from './Diagram.module.css';
import { getStyle } from './utils';

function Graininess() {
  const { i18n, t } = useTranslation();
  const data = {};
  return (
    <svg viewBox="0 0 800 450">
      <path
        stroke="#231f20"
        stroke-width=".8"
        d="M1 323h27v27H1zM1 358h27v27H1zM1 392h27v27H1z"
      />
      <text x="-1" y="274" font-size="26">
        {t('forestTypeDiagram.legend.label')}
      </text>
      <text x="1" y="309" font-size="19.7">
        {t('forestTypeDiagram.legend.distribution')}
      </text>
      <text x="43" y="342" font-size="19.7">
        {t('forestTypeDiagram.legend.often')}
      </text>
      <text x="43" y="376" font-size="19.7">
        {t('forestTypeDiagram.legend.medium')}
      </text>
      <text x="43" y="410" font-size="19.7">
        {t('forestTypeDiagram.legend.rare')}
      </text>
      <path d="M454 229h16v165h-16zM486 229h33v165h-33zM552 229h33v165h-33z" />
      <path
        fill-rule="nonzero"
        d="M619 230v165l164-1-164-164zM486 97v132h66v-66l-66-66zM486 229V97l-32-32v164h32zM552 163l66 66h-66v-66z"
      />
      <path d="M470 229h17v165h-17zM519 229h33v165h-33zM586 229h33v165h-33z" />
      <text x="581" y="440" font-size="19.7">
        {t('forestTypeDiagram.graininess.clay')} [%]
      </text>
      <text x="406" y="297" font-size="19.7" transform="rotate(-90 406 297)">
        {t('forestTypeDiagram.graininess.silt')} [%]
      </text>
      <text x="391" y="27" font-size="29.2">
        {t('forestTypeDiagram.graininess.label')}
      </text>
      <path
        fill="none"
        stroke="#231f20"
        d="M454 64v330h329L453 64M449 229h170M486 395V97M470 395V229M519 395V229M552 395V163M586 395V229M619 395V229M449 64h5"
      />
      <text x="424" y="229" font-size="19.7">
        50
      </text>
      <text x="413" y="67" font-size="19.7">
        100
      </text>
      <text x="464" y="416" font-size="19.7">
        5
      </text>
      <text x="542" y="416" font-size="19.7">
        30
      </text>
      <text x="607" y="416" font-size="19.7">
        50
      </text>
      <text x="768" y="415" font-size="19.7">
        100
      </text>
      <path fill-rule="nonzero" d="M1 57h34v33H1zM1 104h34v34H1z" />
      <text y="27" font-size="29.2">
        {t('forestTypeDiagram.rawMaterial.label')}
      </text>
      <text x="47" y="82" font-size="23.4">
        {t('forestTypeDiagram.rawMaterial.acid')}
      </text>
      <text x="47" y="126" font-size="23.4">
        {t('forestTypeDiagram.rawMaterial.alkaline')}
      </text>
      <text x="47" y="169" font-size="23.4">
        {t('forestTypeDiagram.rawMaterial.unkown')}
      </text>
      <path
        fill="none"
        stroke="#231f20"
        stroke-width=".8"
        d="M0 57h34v34H0zM0 104h34v34H0z"
      />
    </svg>
  );
}

export default Graininess;
