import React from 'react';
import { useTranslation } from 'react-i18next';
// eslint-disable-next-line import/no-unresolved
import { info } from 'lib/src';

import styles from './Diagram.module.css';
import { getStyle } from './utils';

function Site() {
  const { i18n, t } = useTranslation();
  const data = {};
  return (
    <svg viewBox="0 0 400 400">
      <path
        fill-rule="nonzero"
        d="M303 312l-21-46c6-3 13-5 21-5v51zM303 364c-8 0-15-1-21-4l21-48v52zM355 312l-4 20-48-20h52zM355 312h-52l47-20c3 6 4 13 5 20z"
      />
      <path fill-rule="nonzero" d="M303 312l37-36c4 5 8 10 10 16l-47 20z" />
      <path fill-rule="nonzero" d="M303 312l20-47 17 11-37 36z" />
      <path
        fill-rule="nonzero"
        d="M303 312v-51c7 0 14 1 20 4l-20 47zM340 349l-37-37 48 20c-3 7-6 12-11 17z"
      />
      <path fill-rule="nonzero" d="M340 349c-5 5-10 8-17 11l-20-48 37 37z" />
      <path
        fill-rule="nonzero"
        d="M303 312l20 48c-6 3-14 4-20 4v-52zM303 312l-21 48c-6-2-11-7-16-11l37-37z"
      />
      <path
        fill-rule="nonzero"
        d="M303 312l-37 37c-4-4-9-10-11-17l48-20zM303 312l-36-36c4-4 10-9 15-10l21 46z"
      />
      <path
        fill-rule="nonzero"
        d="M303 312l-47-20c2-6 6-12 11-16l36 36zM303 312l-48 20-4-20h52z"
      />
      <path fill-rule="nonzero" d="M303 312h-52c0-6 2-14 5-20l47 20z" />
      <text x="247" y="226" font-size="26.6">
        {t('forestTypeDiagram.aspect.label')}
      </text>
      <text x="297" y="252" font-size="15.3">
        {t('forestTypeDiagram.aspect.N')}
      </text>
      <text x="297" y="385" font-size="15.3">
        {t('forestTypeDiagram.aspect.S')}
      </text>
      <text x="368" y="317" font-size="15.3">
        {t('forestTypeDiagram.aspect.E')}
      </text>
      <text x="228" y="316" font-size="15.3">
        {t('forestTypeDiagram.aspect.W')}
      </text>
      <path
        fill="none"
        stroke="#231f20"
        d="M355 313a52 52 0 11-104 0 52 52 0 01104 0z"
      />
      <path
        fill="none"
        stroke="#231f20"
        stroke-width=".5"
        d="M348 312h13m-116 0h13m77-31l10-10m-83 83l10-10m31 13v14m0-117v14m-31 13l-10-10m83 82l-10-9"
      />
      <path
        fill-rule="nonzero"
        d="M250 68v107l45-96c-13-6-26-11-45-11zM250 175l65-83c-5-5-12-9-20-13l-45 96z"
      />
      <path
        fill-rule="nonzero"
        d="M332 108l-82 67 65-83c7 5 12 10 17 16zM345 129l-95 46 82-67c4 5 9 12 13 21z"
      />
      <path fill-rule="nonzero" d="M353 151l-103 24 95-46c4 6 6 14 8 22z" />
      <path fill-rule="nonzero" d="M250 175l103-24c2 7 3 17 3 24H250z" />
      <text x="244" y="34" font-size="26.6">
        {t('forestTypeDiagram.slope')}
      </text>
      <text x="282" y="66" font-size="14.3">
        100%
      </text>
      <text x="317" y="84" font-size="14.3">
        75%
      </text>
      <text x="339" y="104" font-size="14.3">
        50%
      </text>
      <text x="354" y="128" font-size="14.3">
        25%
      </text>
      <text x="362" y="152" font-size="14.3">
        10%
      </text>
      <path
        fill="none"
        stroke="#231f20"
        d="M250 175V68c58 1 106 49 106 107H250z"
      />
      <path
        fill="none"
        stroke="#231f20"
        stroke-width=".5"
        d="M311 97l8-10M297 73l-5 12M327 113l11-9M352 126l-13 6M360 149l-13 3"
      />
      <path d="M123 320h26v6h-26zM70 331h27v6H70zM123 342h26v5h-26zM96 320h27v6H96z" />
      <path d="M70 326h27v6H70zM70 320h27v6H70z" />
      <path d="M96 326h27v6H96zM123 326h26v6h-26z" />
      <path d="M96 331h27v6H96zM123 331h26v6h-26zM123 337h26v6h-26zM96 337h27v6H96z" />
      <path d="M70 337h27v6H70z" />
      <path d="M96 342h27v5H96z" />
      <path d="M70 342h27v5H70zM70 348h27v5H70z" />
      <path d="M96 348h27v5H96zM123 348h26v5h-26zM70 287h27v6H70zM123 298h26v6h-26zM70 309h27v6H70z" />
      <path d="M96 287h27v6H96zM123 287h26v6h-26z" />
      <path d="M123 292h26v6h-26zM96 292h27v6H96z" />
      <path d="M70 292h27v6H70zM96 298h27v6H96z" />
      <path d="M70 298h27v6H70zM70 304h27v6H70z" />
      <path d="M96 304h27v6H96zM123 304h26v6h-26z" />
      <path d="M96 309h27v6H96zM123 309h26v6h-26zM123 315h26v6h-26zM96 315h27v6H96z" />
      <path d="M70 315h27v6H70zM70 253h27v6H70z" />
      <path d="M96 253h27v6H96zM70 259h27v6H70zM123 259h26v6h-26zM123 253h26v6h-26z" />
      <path d="M96 259h27v6H96zM70 265h27v6H70zM123 276h26v6h-26z" />
      <path d="M96 265h27v6H96zM123 265h26v6h-26z" />
      <path d="M123 270h26v6h-26zM96 270h27v6H96z" />
      <path d="M70 270h27v6H70zM96 276h27v6H96z" />
      <path d="M70 276h27v6H70z" />
      <path d="M70 281h27v6H70z" />
      <path d="M96 281h27v6H96zM123 281h26v6h-26zM70 220h27v6H70zM123 231h26v6h-26zM70 242h27v6H70zM70 226h27v6H70z" />
      <path d="M96 220h27v6H96zM96 226h27v6H96zM123 226h26v6h-26zM123 220h26v6h-26z" />
      <path d="M96 231h27v6H96z" />
      <path d="M70 231h27v6H70zM70 237h27v6H70z" />
      <path d="M96 237h27v6H96zM123 237h26v6h-26zM70 248h27v6H70z" />
      <path d="M96 242h27v6H96zM123 248h26v6h-26zM123 242h26v6h-26zM96 248h27v6H96zM123 187h26v6h-26zM70 198h27v6H70zM123 209h26v6h-26zM96 187h27v6H96z" />
      <path d="M70 192h27v6H70z" />
      <path d="M70 187h27v6H70z" />
      <path d="M96 192h27v6H96zM123 192h26v6h-26zM96 198h27v6H96zM123 198h26v6h-26z" />
      <path d="M96 203h27v6H96z" />
      <path d="M70 203h27v6H70zM123 203h26v6h-26zM96 214h27v6H96z" />
      <path d="M96 209h27v6H96z" />
      <path d="M70 209h27v6H70z" />
      <path d="M70 214h27v6H70zM123 214h26v6h-26zM70 153h27v6H70zM123 164h26v6h-26zM70 175h27v6H70z" />
      <path d="M96 153h27v6H96zM123 159h26v6h-26zM96 164h27v6H96z" />
      <path d="M70 159h27v6H70zM123 153h26v6h-26z" />
      <path d="M96 159h27v6H96z" />
      <path d="M70 164h27v6H70zM70 170h27v6H70z" />
      <path d="M96 170h27v6H96zM123 170h26v6h-26z" />
      <path d="M96 175h27v6H96zM123 175h26v6h-26zM96 181h27v6H96zM123 181h26v6h-26z" />
      <path d="M70 181h27v6H70zM70 120h27v6H70zM96 126h27v6H96zM123 120h26v6h-26z" />
      <path d="M70 131h27v6H70zM123 142h26v5h-26zM96 120h27v6H96zM123 126h26v6h-26z" />
      <path d="M70 126h27v6H70z" />
      <path d="M96 131h27v6H96zM123 137h26v6h-26zM96 148h27v5H96zM96 142h27v5H96z" />
      <path d="M70 137h27v6H70zM70 148h27v5H70zM123 148h26v5h-26zM123 131h26v6h-26z" />
      <path d="M96 137h27v6H96z" />
      <path d="M70 142h27v5H70z" />
      <path
        fill="none"
        stroke="#231f20"
        stroke-width=".7"
        d="M123 120v233M70 120h79v233H70zM96 120v233M70 131h79M70 142h79M70 164h79M70 175h79M70 198h79M70 209h79M70 231h79M70 242h79M70 265h79M70 276h79M70 298h79M70 309h79M70 331h79M70 342h79"
      />
      <text x="16" y="34" font-size="26.6">
        {t('forestTypeDiagram.altitude.label')}
      </text>
      <text x="-1" y="76" font-size="14.3">
        {t('forestTypeDiagram.meter')}
      </text>
      <text x="25" y="96" font-size="14.3">
        {t('forestTypeDiagram.aboveSeaLevel')}
      </text>
      <text x="74" y="76" font-size="16.9">
        {t('forestTypeDiagram.altitude.situation')}
      </text>
      <text x="81" y="109" font-size="14.3">
        {t('forestTypeDiagram.altitude.aspect')}
      </text>
      <path
        fill="none"
        stroke="#231f20"
        stroke-width=".7"
        d="M149 320H63M149 287H63M149 253H63M149 220H63M149 187H63M149 153H63"
      />
      <text x="25" y="122" font-size="14.3">
        2300
      </text>
      <text x="25" y="156" font-size="14.3">
        2000
      </text>
      <text x="25" y="189" font-size="14.3">
        1700
      </text>
      <text x="25" y="222" font-size="14.3">
        1400
      </text>
      <text x="26" y="256" font-size="14.3">
        1
        <tspan x="33 41" y="256 256">
          10
        </tspan>
        0
      </text>
      <text x="33" y="289" font-size="14.3">
        800
      </text>
      <text x="33" y="323" font-size="14.3">
        500
      </text>
      <text x="33" y="356" font-size="14.3">
        200
      </text>
      <path
        fill="none"
        stroke="#231f20"
        stroke-width=".7"
        d="M63 120h6M63 353h6"
      />
    </svg>
  );
}

export default Site;
