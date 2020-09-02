import React from 'react';
import { useTranslation } from 'react-i18next';
// eslint-disable-next-line import/no-unresolved
import { info } from 'lib/src';

import styles from './Diagram.module.css';
import { getStyle } from './utils';

function Humus() {
  const { i18n, t } = useTranslation();
  const data = {};
  return (
    <svg viewBox="0 0 800 400">
      <path d="M611 238h95v24h-95z" />
      <path d="M705 238h95v24h-95zM327 139h95v23h-95zM327 163h95v76h-95z" />
      <path d="M327 238h95v24h-95zM421 139h95v23h-95z" />
      <path d="M421 163h95v76h-95z" />
      <path d="M421 238h95v24h-95zM516 139h95v23h-95zM516 163h95v76h-95z" />
      <path d="M516 238h95v24h-95zM234 334h29v29h-29zM234 370h29v29h-29zM418 334h29v29h-29zM418 369h29v29h-29zM604 334h29v29h-29zM604 370h29v29h-29zM705 139h95v23h-95z" />
      <path d="M611 139h95v23h-95zM705 163h95v76h-95z" />
      <path d="M611 163h95v76h-95zM232 139h95v23h-95zM232 163h95v76h-95z" />
      <path d="M232 238h95v24h-95z" />
      <text x="1" y="20" font-size="25.1">
        {t('forestTypeDiagram.humus.label')}
      </text>
      <path
        fill="none"
        stroke="#231f20"
        stroke-width="1.4"
        d="M232 41v222M231 262h568"
      />
      <path fill="none" stroke="#231f20" stroke-width=".8" d="M231 238h568" />
      <path fill="none" stroke="#231f20" stroke-width="1.4" d="M800 42v221" />
      <path
        fill="none"
        stroke="#231f20"
        stroke-width=".8"
        d="M231 163h568M231 139h568M421 73v190M611 42v220M327 42v221M516 73v190"
      />
      <path fill="none" stroke="#231f20" d="M705 73v189" />
      <text x="235" y="67" font-size="18.5">
        {t('forestTypeDiagram.humus.mor')}
      </text>
      <text x="444" y="67" font-size="18.5">
        {t('forestTypeDiagram.humus.moder')}
      </text>
      <text x="688" y="67" font-size="18.5">
        {t('forestTypeDiagram.humus.mull')}
      </text>
      <text x="329" y="108" font-size="13.4">
        {t('forestTypeDiagram.humus.morLike')}
      </text>
      <text x="436" y="107" font-size="13.4">
        {t('forestTypeDiagram.humus.moderLike')}
      </text>
      <text x="524" y="107" font-size="13.4">
        {t('forestTypeDiagram.humus.mullLike')}
      </text>
      <text x="636" y="107" font-size="13.4">
        {t('forestTypeDiagram.humus.fmull')}
      </text>
      <text x="730" y="107" font-size="13.4">
        {t('forestTypeDiagram.humus.lmull')}
      </text>
      <path
        fill="none"
        stroke="#231f20"
        stroke-width=".8"
        d="M0 162h190M0 238h190"
      />
      <text x="1" y="129" font-size="17">
        {t('forestTypeDiagram.humus.dry')}
      </text>
      <text x="1" y="151" font-size="17">
        {t('forestTypeDiagram.humus.xero')}
      </text>
      <text x="1" y="261" font-size="17">
        {t('forestTypeDiagram.humus.wet')}
      </text>
      <text x="1" y="283" font-size="17">
        {t('forestTypeDiagram.humus.hydro')}
      </text>
      <text x="644" y="354" font-size="20.1">
        {t('forestTypeDiagram.humus.tangel')}
      </text>
      <text x="644" y="391" font-size="20.1">
        {t('forestTypeDiagram.humus.eroded')}
      </text>
      <path
        fill="none"
        stroke="#231f20"
        stroke-width=".7"
        d="M604 334h29v29h-29zM604 370h29v29h-29z"
      />
      <text x="2" y="352" font-size="20.1">
        {t('forestTypeDiagram.humus.variants')}
      </text>
      <text x="458" y="354" font-size="20.1">
        {t('forestTypeDiagram.humus.limeMull')}
      </text>
      <text x="458" y="391" font-size="20.1">
        {t('forestTypeDiagram.humus.limeModer')}
      </text>
      <path
        fill="none"
        stroke="#231f20"
        stroke-width=".7"
        d="M418 334h29v29h-29zM418 369h29v29h-29z"
      />
      <text x="273" y="354" font-size="20.1">
        {t('forestTypeDiagram.humus.halfBog')}
      </text>
      <text x="273" y="391" font-size="20.1">
        {t('forestTypeDiagram.humus.turf')}
      </text>
      <path
        fill="none"
        stroke="#231f20"
        stroke-width=".7"
        d="M234 334h29v29h-29zM234 370h29v29h-29z"
      />
    </svg>
  );
}

export default Humus;
