import PropTypes from 'prop-types';
import React from 'react';
import { Modal } from 'semantic-ui-react';

import Button from './Button';

import styles from './ForestTypeModal.module.css';

function ForestTypeModal({ code, setIsForestTypeModalOpen }) {
  return (
    <Modal
      actions={[{ key: 'done', content: 'Ok' }]}
      content={
        <Modal.Content className={styles.text}>
          <svg
            id="svg8"
            version="1.1"
            viewBox="0 0 199.93699 275.56532"
            height="317mm"
            width="230mm"
          >
            <g id="layer1">
              <path
                className={styles.rare}
                d="m 85.42637,25.834985 5.826397,0.919018 -5.826397,-2.833534 z"
                id="HS_OSA-4"
              />
              <path
                className={styles.rare}
                d="m 75.245857,26.24818 5.830645,-1.099315 4.349868,0.68612 v -1.914516 l -5.312993,-2.575749 -4.86752,3.803903 z"
                id="HS_OSA-3"
              />
              <path
                className={styles.rare}
                d="M 73.416973,26.577873 75.245857,26.24818 V 25.148623 Z"
                id="HS_OSA-2b"
              />
              <path
                className={styles.rare}
                d="m 101.02291,32.712242 3.30532,0.372308 -3.30532,-1.602849 z"
                id="HS_SA-5b"
              />
              <path
                className={styles.rare}
                d="m 92.893371,31.787509 8.129539,0.924733 v -1.230541 l -8.117411,-3.935335 z"
                id="HS_SA-5a"
              />
              <path
                className={styles.rare}
                d="m 85.426365,30.940534 7.479128,0.84835 v -4.242518 l -1.652731,-0.792364 -5.826397,-0.919017 z"
                id="HS_SA-4"
              />
              <path
                className={styles.rare}
                d="m 75.245861,31.222498 5.873809,-0.770468 4.306704,0.488504 v -5.105549 l -4.349868,-0.68612 -5.830645,1.099315 z"
                id="HS_SA-3"
              />
              <path
                className={styles.rare}
                d="m 68.604878,31.222498 h 6.640976 V 26.24818 l -6.640976,1.197168 z"
                id="HS_SA-2b"
              />
              <path
                className={styles.rare}
                d="m 61.942816,28.625213 v 2.597285 h 6.662058 v -3.77715 z"
                id="HS_SA-2a"
              />
              <path
                className={styles.rare}
                d="m 47.277382,31.222498 h 14.66544 v -2.597285 z"
                id="HS_SA-1"
              />
              <path
                className={styles.rare}
                d="m 92.89337,31.787504 -2e-5,6.316488 8.12956,-5.39175 z"
                id="HS_HM-5a"
              />
              <path
                className={styles.rare}
                d="m 85.426373,30.940534 0.006,8.349497 7.461,-1.186039 v -6.316488 z"
                id="HS_HM-4"
              />
              <path
                className={styles.rare}
                d="M 85.42637,43.224763 V 30.940535 l -4.306704,-0.488504 -5.873807,0.770437 8.3e-5,12.258692 5.226633,-4.079888 z"
                id="HS_HM-3"
              />
              <path
                className={styles.rare}
                d="m 68.604881,31.222498 0.0068,12.546003 2.013148,0.08769 4.621094,-6.967357 v -5.666352 z"
                id="HS_HM-2b"
              />
              <path
                className={styles.rare}
                d="m 61.942823,31.222498 -0.0071,3.643736 6.669158,-2.053167 v -1.590569 z"
                id="HS_HM-2a"
              />
              <path
                className={styles.rare}
                d="m 47.015887,32.861749 14.919885,2.004484 0.01208,-3.643735 H 47.277383 l -2.504966,2.424887 z"
                id="HS_HM-1"
              />
              <path
                className={styles.rare}
                d="m 92.893028,38.104042 0.0063,1.169378 8.124322,-2.33183 v -4.231873 z"
                id="HS_UMOM-5a"
              />
              <path
                className={styles.rare}
                d="m 101.02291,32.712242 3.30646,0.372437 4.18665,2.021054 -0.0287,1.757186 -7.46065,2.333653 z"
                id="HS_UMOM-5b"
              />
              <path
                className={styles.rare}
                d="m 47.015888,32.861749 0.01327,3.760224 14.886244,2.291154 0.02036,-4.046893 z"
                id="HS_OM-1"
              />
              <path
                className={styles.rare}
                d="m 61.935771,34.866234 -0.02038,4.046891 6.691784,-1.80326 -0.0022,-4.296798 z"
                id="HS_OM-2a"
              />
              <path
                className={styles.rare}
                d="m 61.927357,45.713933 4.340482,-1.284467 1.166167,-2.469543 -5.508691,2.195689 z"
                id="HS_SM-2a"
              />
              <path
                className={styles.rare}
                d="m 108.48731,36.862919 0.0118,11.822784 -7.47545,0.0063 0.003,-9.49543 z"
                id="HS_C-5b"
              />
              <path
                className={styles.rare}
                d="m 101.02367,36.94159 v 11.750385 l -8.130642,0.0068 0.0063,-9.425349 z"
                id="HS_C-5a"
              />
              <path
                className={styles.rare}
                d="m 92.89303,38.104042 v 10.594757 h -0.374329 l -7.092331,-5.474037 0.006,-3.934731 z"
                id="HS_C-4"
              />
              <path
                className={styles.rare}
                d="m 68.6117,43.768501 2.013149,0.08769 4.621093,-6.96736 v 6.592359 l -6.623788,5.203808 z"
                id="HS_C-2b"
              />
              <path
                className={styles.rare}
                d="m 61.927355,48.685002 h 6.694799 l -0.01723,-8.103485 -1.170928,1.378407 -1.166167,2.469542 -4.340481,1.284467 z"
                id="HS_C-2a"
              />
              <path
                className={styles.rare}
                d="m 61.927357,45.713928 v 2.971074 H 47.05472 l -0.0012,-2.973868 z"
                id="HS_C-1"
              />
              <path
                className={styles.rare}
                d="m 61.925258,44.155618 0.0021,1.558316 -14.873737,-0.0028 -0.01087,-3.926541 z"
                id="HS_SM-1"
              />
              <path
                className={styles.rare}
                d="m 39.731056,38.436603 7.298104,-1.81463 -0.01327,-3.760224 -2.243475,0.785636 z"
                id="HS_OM-M"
              />
              <path
                className={styles.rare}
                d="m 47.054719,45.711134 v 2.973868 H 30.591798 l -1.8e-4,-1.499575 1.541465,-1.474293 z"
                id="HS_C-M"
              />
              <path
                className={styles.rare}
                d="m 47.042751,41.784593 0.01197,3.926541 H 32.133084 l 1.837868,-1.73826 z"
                id="HS_SM-M"
              />
              <path
                className={styles.rare}
                d="m 30.591799,47.185691 v 1.499311 H 14.885711 l 0.0084,-2.984087 14.691029,0.0074 z"
                id="HS_C-J"
              />
              <path
                className={styles.rare}
                d="m 15.70965,43.604562 -0.81549,2.096357 14.69103,0.0074 -2.902469,-4.28818 z"
                id="HS_SM-J"
              />
              <path
                className={styles.rare}
                d="m 19.321298,34.320492 1.826708,-1.094147 -0.881053,-1.336744 z"
                id="HS_HM-J"
              />
              <path
                className={styles.rare}
                d="m 17.590017,38.817565 6.147984,-1.779561 -2.589995,-3.811659 -1.826666,1.094039 z"
                id="HS_OM-J"
              />
              <path
                id="HS_UM-J"
                className="lessFrequent"
                d="m 17.590017,38.817566 6.147984,-1.779562 2.94472,4.382135 -10.973071,2.184423 z"
              />
              <path
                id="HS_UM-1"
                className="veryFrequent"
                d="m 61.916315,38.913265 0.009,5.242348 -14.882564,-2.37102 -0.01359,-5.16262 z"
              />
              <path
                id="HS_UM-M"
                className="veryFrequent"
                d="m 47.042751,41.784593 -13.071799,2.188281 5.760104,-5.536271 7.298104,-1.81463 z"
              />
              <path
                id="HS_UM-2a"
                className="veryFrequent"
                d="m 61.925315,44.155613 -0.009,-5.242348 0.124771,-0.01096 6.566089,-1.79244 -0.0022,3.477498 -1.170959,1.372561 -2.932745,1.168953 z"
              />
              <path
                className={styles.rare}
                d="m 75.099347,37.109865 h -6.492172 l 0.0045,6.658636 2.013128,0.08769 z"
                id="HS_HMspez-2b"
              />
              <rect
                className={styles.rare}
                id="HS_HM-2b-spez53"
                width="6.640976"
                height="1.590569"
                x="68.604874"
                y="31.222511"
              />
              {/* <text
                // style="font-size:3.98667px"
                x="9.1458921"
                y="6.1399994"
                id="text2794"
              >
                <tspan className="de">Höhenstufe / Region</tspan>
                <tspan className="fr invisible">
                  Etage de végétation / Région
                </tspan>
              </text>
              <text
                // style="font-size:2.14667px;text-align:end;text-anchor:end"
                x="13.773439"
                y="16.878149"
                id="text2800"
              >
                <tspan className="de" id="tspan775">
                  Meter
                </tspan>
                <tspan className="fr invisible" id="tspan777">
                  (m)
                </tspan>
              </text>
              <text
                // style="font-size:2.14667px;text-align:end;text-anchor:end"
                className="de"
                y="19.418001"
                x="13.83236"
                id="text2802"
              >
                ü. M.
              </text>
              <text
                // style="font-size:2.14667px;text-align:end;text-anchor:end"
                y="26.298904"
                x="13.723823"
                id="text2804"
              >
                2000
              </text>
              <text
                // style="font-size:2.14667px;text-align:end;text-anchor:end"
                y="31.946411"
                x="13.723823"
                id="text2806"
              >
                1600
              </text>
              <text
                // style="font-size:2.14667px;text-align:end;text-anchor:end"
                y="41.109428"
                x="13.723823"
                id="text2808"
              >
                800
              </text>
              <text
                // style="font-size:2.14667px;text-align:center;text-anchor:middle"
                y="17.840015"
                x="22.807142"
                id="text2810"
              >
                J
              </text>
              <text
                // style="font-size:2.14667px;text-align:center;text-anchor:middle"
                y="17.840015"
                x="38.808167"
                id="text2812"
              >
                M
              </text>
              <text
                // style="font-size:2.14667px;text-align:center;text-anchor:middle"
                y="17.840015"
                x="54.453819"
                id="text2814"
              >
                1
              </text>
              <text
                // style="font-size:2.14667px;text-align:center;text-anchor:middle"
                y="17.840015"
                x="68.594864"
                id="text2816"
              >
                2
              </text>
              <text
                // style="font-size:2.14667px;text-align:center;text-anchor:middle"
                y="17.840015"
                x="80.342941"
                id="text2818"
              >
                3
              </text>
              <text
                // style="font-size:2.14667px;text-align:center;text-anchor:middle"
                y="17.840015"
                x="89.167213"
                id="text2820"
              >
                4
              </text>
              <text
                // style="font-size:2.14667px;text-align:center;text-anchor:middle"
                y="17.840015"
                x="100.89888"
                id="text2822"
              >
                5
              </text>
              <text
                // style="font-size:2.14667px;text-align:center;text-anchor:middle"
                x="65.220337"
                y="19.91357"
                id="text2824"
              >
                2a
              </text>
              <text
                // style="font-size:2.14667px;text-align:center;text-anchor:middle"
                x="71.916977"
                y="19.91357"
                id="text2826"
              >
                2b
              </text>
              <text
                // style="font-size:2.14667px;text-align:center;text-anchor:middle"
                x="96.915642"
                y="19.91357"
                id="text2828"
              >
                5a
              </text>
              <text
                // style="font-size:2.14667px;text-align:center;text-anchor:middle"
                x="104.76365"
                y="19.91357"
                id="text2830"
              >
                5b
              </text>
              <text
                // style="font-size:2.14667px;text-align:center;text-anchor:middle"
                y="11.166852"
                x="22.727921"
                id="tspan2832"
              >
                <tspan className="de">Jura</tspan>
                <tspan className="fr invisible">Jura</tspan>
              </text>
              <text
                // style="font-size:2.14667px;text-align:center;text-anchor:middle"
                y="11.263559"
                x="38.788754"
                id="tspan2834"
              >
                <tspan className="de">Mittelland</tspan>
                <tspan className="fr invisible">Plateau</tspan>
              </text>
              <text
                // style="font-size:2.14667px;text-align:center;text-anchor:middle"
                y="10.601654"
                x="54.492119"
                id="tspan2836"
              >
                <tspan className="de">Nördl.</tspan>
                <tspan className="fr invisible">Alpes externes</tspan>
              </text>
              <text
                // style="font-size:2.14667px;text-align:center;text-anchor:middle"
                y="13.103132"
                x="54.46484"
                id="tspan2838"
              >
                <tspan className="de">Randalpen</tspan>
                <tspan className="fr invisible">du Nord</tspan>
              </text>
              <text
                // style="font-size:2.14667px;text-align:center;text-anchor:middle"
                y="9.086586"
                x="68.603783"
                id="tspan2840"
              >
                <tspan className="de">Nördl.</tspan>
                <tspan className="fr invisible">Alpes inter-</tspan>
              </text>
              <text
                // style="font-size:2.14667px;text-align:center;text-anchor:middle"
                y="11.58806"
                x="68.609032"
                id="tspan2842"
              >
                <tspan className="de">Zwischen-</tspan>
                <tspan className="fr invisible">médiaires</tspan>-
              </text>
              <text
                // style="font-size:2.14667px;text-align:center;text-anchor:middle"
                y="14.089538"
                x="68.618996"
                id="tspan2844"
              >
                <tspan className="de">alpen</tspan>
                <tspan className="fr invisible">du Nord</tspan>
              </text>
              <text
                // style="font-size:2.14667px;text-align:center;text-anchor:middle"
                y="9.086586"
                x="80.345566"
                id="tspan2846"
              >
                <tspan className="de">Kontinent.</tspan>
                <tspan className="fr invisible">Hautes</tspan>
              </text>
              <text
                // style="font-size:2.14667px;text-align:center;text-anchor:middle"
                y="11.58806"
                x="80.296776"
                id="tspan2848"
              >
                <tspan className="de">Hoch-</tspan>
                <tspan className="fr invisible">Alpen</tspan>
              </text>
              <text
                // style="font-size:2.14667px;text-align:center;text-anchor:middle"
                y="14.089538"
                x="80.360779"
                id="tspan2850"
              >
                <tspan className="de">alpen</tspan>
                <tspan className="fr invisible">continent.</tspan>
              </text>
              <text
                // style="font-size:2.14667px;text-align:center;text-anchor:middle"
                y="9.086586"
                x="89.208664"
                id="tspan2852"
              >
                <tspan className="de">Südl.</tspan>
                <tspan className="fr invisible">Alpes</tspan>
              </text>
              <text
                // style="font-size:2.14667px;text-align:center;text-anchor:middle"
                y="11.58806"
                x="89.174561"
                id="tspan2854"
              >
                <tspan className="de">Zwischen-</tspan>
                <tspan className="fr invisible">interméd.</tspan>
              </text>
              <text
                // style="font-size:2.14667px;text-align:center;text-anchor:middle"
                y="14.089538"
                x="89.184532"
                id="tspan2856"
              >
                <tspan className="de">alpen</tspan>
                <tspan className="fr invisible">du Sud</tspan>
              </text>
              <text
                // style="font-size:2.14667px;text-align:center;text-anchor:middle"
                y="10.601654"
                x="100.74505"
                id="tspan2858"
              >
                <tspan className="de">Südl.</tspan>
                <tspan className="fr invisible">Alpes externes</tspan>
              </text>
              <text
                // style="font-size:2.14667px;text-align:center;text-anchor:middle"
                y="13.103132"
                x="100.67841"
                id="tspan2860"
              >
                <tspan className="de">Randalpen</tspan>
                <tspan className="fr invisible">du Sud</tspan>
              </text>
              <text
                id="text3082"
                // style="font-size:2.14667px;stroke-width:0.352778"
                x="15.258379"
                y="52.616104"
              >
                <tspan className="de">OSA</tspan>
                <tspan className="fr invisible">SS</tspan>
              </text>
              <text
                id="text3086"
                // style="font-size:2.14667px;stroke-width:0.352778"
                x="15.258379"
                y="55.836121"
              >
                <tspan className="de">SA</tspan>
                <tspan className="fr invisible">SA</tspan>
              </text>
              <text
                id="text3090"
                // style="font-size:2.14667px;stroke-width:0.352778"
                x="40.846642"
                y="52.616104"
              >
                <tspan className="de">HM</tspan>
                <tspan className="fr invisible">HM</tspan>
              </text>
              <text
                id="text3094"
                // style="font-size:2.14667px;stroke-width:0.352778"
                x="40.846642"
                y="55.836121"
              >
                <tspan className="de">OM</tspan>
                <tspan className="fr invisible">MS</tspan>
              </text>
              <text
                id="text3098"
                // style="font-size:2.14667px;stroke-width:0.352778"
                x="69.129131"
                y="52.616104"
              >
                <tspan className="de">UM</tspan>
                <tspan className="fr invisible">MI</tspan>
              </text>
              <text
                id="text3102"
                // style="font-size:2.14667px;stroke-width:0.352778"
                x="69.129131"
                y="55.836121"
              >
                <tspan className="de">SM</tspan>
                <tspan className="fr invisible">SM</tspan>
              </text>
              <text
                id="text3106"
                // style="font-size:2.14667px;stroke-width:0.352778"
                x="96.629959"
                y="52.616104"
              >
                <tspan className="de">C</tspan>
                <tspan className="fr invisible">C</tspan>
              </text>
              <text
                // style="font-size:2.14667px"
                y="52.616104"
                x="20.547829"
                id="tspan2864"
              >
                <tspan className="de">Obersubalpin</tspan>
                <tspan className="fr invisible">subalpin supérieur</tspan>
              </text>
              <text
                // style="font-size:2.14667px"
                y="55.836121"
                x="20.547829"
                id="tspan2866"
              >
                <tspan className="de">Subalpin</tspan>
                <tspan className="fr invisible">subalpin</tspan>
              </text>
              <text
                // style="font-size:2.14667px"
                y="52.616104"
                x="45.846989"
                id="tspan2868"
              >
                <tspan className="de">Hochmontan</tspan>
                <tspan className="fr invisible">haut-montagnard</tspan>
              </text>
              <text
                // style="font-size:2.14667px"
                y="55.836121"
                x="45.846989"
                id="tspan2870"
              >
                <tspan className="de">Obermontan</tspan>
                <tspan className="fr invisible">montagnard supérieur</tspan>
              </text>
              <text
                // style="font-size:2.14667px"
                y="52.616104"
                x="74.04314"
                id="tspan2872"
              >
                <tspan className="de">Untermontan</tspan>
                <tspan className="fr invisible">montagnard inférieur</tspan>
              </text>
              <text
                // style="font-size:2.14667px"
                y="55.836121"
                x="74.04314"
                id="tspan2874"
              >
                <tspan className="de">Submontan</tspan>
                <tspan className="fr invisible">submontagnard</tspan>
              </text>
              <text
                // style="font-size:2.14667px"
                y="52.616104"
                x="99.928825"
                id="tspan2876"
              >
                <tspan className="de">Collin</tspan>
                <tspan className="fr invisible">collinéen</tspan>
              </text>
              <text
                id="text3018"
                // style="font-size:2.14667px;stroke-width:0.352778"
                x="80.041878"
                y="24.772266"
              >
                <tspan className="de">OSA</tspan>
                <tspan className="fr invisible">SS</tspan>
              </text>
              <text
                id="text3022"
                // style="font-size:2.14667px;stroke-width:0.352778"
                x="75.25528"
                y="29.68512"
              >
                <tspan className="de">SA</tspan>
                <tspan className="fr invisible">SA</tspan>
              </text>
              <text
                id="text3078"
                // style="font-size:2.14667px;stroke-width:0.352778"
                x="91.663925"
                y="29.68512"
              >
                <tspan className="de">SA</tspan>
                <tspan className="fr invisible">SA</tspan>
              </text>
              <text
                id="text3026"
                // style="font-size:2.14667px;stroke-width:0.352778"
                x="84.556053"
                y="34.998165"
              >
                <tspan className="de">HM</tspan>
                <tspan className="fr invisible">HM</tspan>
              </text>
              <text
                id="text3030"
                // style="font-size:2.14667px;stroke-width:0.352778"
                x="60.797283"
                y="33.240307"
              >
                <tspan className="de">HM</tspan>
                <tspan className="fr invisible">HM</tspan>
              </text>
              <text
                id="text3034"
                // style="font-size:2.14667px;stroke-width:0.352778"
                x="21.097395"
                y="32.958675"
              >
                <tspan className="de">HM</tspan>
                <tspan className="fr invisible">HM</tspan>
              </text>
              <text
                id="text3038"
                // style="font-size:2.14667px;stroke-width:0.352778"
                x="46.145084"
                y="35.251705"
              >
                <tspan className="de">OM</tspan>
                <tspan className="fr invisible">MS</tspan>
              </text>
              <text
                id="text3042"
                // style="font-size:2.14667px;stroke-width:0.352778"
                x="99.372017"
                y="35.539783"
              >
                <tspan className="de">OM /</tspan>
                <tspan className="fr invisible">MS /</tspan>
              </text>
              <text
                id="text3046"
                // style="font-size:2.14667px;stroke-width:0.352778"
                x="19.255747"
                y="36.895298"
              >
                <tspan className="de">OM</tspan>
                <tspan className="fr invisible">MS</tspan>
              </text>
              <text
                id="text3050"
                // style="font-size:2.14667px;stroke-width:0.352778"
                x="21.67625"
                y="39.993851"
              >
                <tspan className="de">UM</tspan>
                <tspan className="fr invisible">MI</tspan>
              </text>
              <text
                id="text3054"
                // style="font-size:2.14667px;stroke-width:0.352778"
                x="46.203293"
                y="39.594013"
              >
                <tspan className="de">UM</tspan>
                <tspan className="fr invisible">MI</tspan>
              </text>
              <text
                id="text3118"
                // style="font-size:2.14667px;stroke-width:0.352778"
                x="102.05225"
                y="37.272133"
              >
                <tspan className="de">UM</tspan>
                <tspan className="fr invisible">MI</tspan>
              </text>
              <text
                id="text3058"
                // style="font-size:2.14667px;stroke-width:0.352778"
                x="22.126492"
                y="44.590969"
              >
                <tspan className="de">SM</tspan>
                <tspan className="fr invisible">SM</tspan>
              </text>
              <text
                id="text3062"
                // style="font-size:2.14667px;stroke-width:0.352778"
                x="46.379997"
                y="44.29026"
              >
                <tspan className="de">SM</tspan>
                <tspan className="fr invisible">SM</tspan>
              </text>
              <text
                id="text3114"
                // style="font-size:2.14667px;stroke-width:0.352778"
                x="22.83769"
                y="47.66832"
              >
                <tspan className="de">C</tspan>
                <tspan className="fr invisible">C</tspan>
              </text>
              <text
                id="text3066"
                // style="font-size:2.14667px;stroke-width:0.352778"
                x="100.9411"
                y="44.29026"
              >
                <tspan className="de">C</tspan>
                <tspan className="fr invisible">C</tspan>
              </text>
              <text
                id="text3070"
                // style="font-size:2.14667px;stroke-width:0.352778"
                x="47.145737"
                y="47.685146"
              >
                <tspan className="de">C</tspan>
                <tspan className="fr invisible">C</tspan>
              </text>
              <text
                id="text3074"
                // style="font-size:2.14667px;stroke-width:0.352778"
                x="68.515007"
                y="46.481186"
              >
                <tspan className="de">C</tspan>
                <tspan className="fr invisible">C</tspan>
              </text> */}
              <path
                id="path2794"
                className={styles.stroke}
                d="m 14.899161,15.093851 -0.005,30.43696"
              />
              <path
                id="path2800"
                className={styles.stroke}
                d="m 14.894161,48.740031 v -3.03918 l 5.372792,-13.81125 10.324845,15.296091 16.685582,-15.963194 26.114375,-4.624917 6.721623,-5.252861 28.380742,13.759039 0.005,13.581944 -15.980012,0.01341 -12.046532,-9.297811 -11.850422,9.2837 H 14.885711"
              />
              <path
                id="path2806"
                className={styles.stroke}
                d="m 19.303793,34.330893 1.844213,-1.104547"
              />
              <path
                id="path2812"
                className={styles.stroke}
                d="m 17.570557,38.819532 6.167444,-1.781528"
              />
              <path
                id="path2818"
                className={styles.stroke}
                d="M 15.697368,43.607008 26.682721,41.420139"
              />
              <path
                id="path2824"
                className={styles.stroke}
                d="m 14.89416,45.700921 14.691031,0.0074"
              />
              <path
                id="path2830"
                className={styles.stroke}
                d="m 73.391932,26.597722 7.684572,-1.448858 10.176264,1.605139"
              />
              <path
                id="path2836"
                className={styles.stroke}
                d="m 32.126669,45.708329 29.800689,0.0056 4.340483,-1.284463 1.1661,-2.469445 1.17103,-1.372658 -0.0046,3.180644 2.024479,0.08819 4.621094,-6.967361 v 6.592358"
              />
              <path
                id="path2842"
                className={styles.stroke}
                d="m 44.772412,33.647386 2.243475,-0.785636 14.919885,2.004483 6.669163,-2.053166 v 7.774163"
              />
              <path
                id="path2848"
                className={styles.stroke}
                d="m 39.744908,38.404207 7.284253,-1.782233 14.887141,2.291291 6.670219,-1.8034"
              />
              <path
                id="path2854"
                className={styles.stroke}
                d="m 33.970952,43.972874 13.071799,-2.188281 14.882564,2.37102 5.508697,-2.195689"
              />
              <path
                id="path2860"
                className={styles.stroke}
                d="M 104.33675,33.085517 81.119666,30.452031 75.24586,31.222498 H 47.277061"
              />
              <path
                id="path2866"
                className={styles.stroke}
                d="m 85.426348,43.240084 0.006,-3.950053 7.461,-1.186039 0.006,1.169459 8.124322,-2.331861 0.003,2.254955 7.46064,-2.333625"
              />
              <path
                id="path2872"
                className={styles.stroke}
                d="m 101.02291,32.712243 -8.129962,5.391855"
              />
              <path
                id="path2878"
                className={`${styles.stroke} ${styles.thin}`}
                d="M 14.182107,25.571739 H 108.4644"
              />
              <path
                id="path2884"
                className={`${styles.stroke} ${styles.thin}`}
                d="m 14.19619,31.220169 h 94.2823"
              />
              <path
                id="path2890"
                className={`${styles.stroke} ${styles.thin}`}
                d="M 14.169713,40.407032 H 108.45201"
              />
              <path
                id="path2896"
                className={styles.stroke}
                d="M 30.59171,15.103129 V 46.954023"
              />
              <path
                id="path2902"
                className={styles.stroke}
                d="M 47.022525,15.09558 V 31.271852"
              />
              <path
                id="path2908"
                className={styles.stroke}
                d="M 61.94282,15.077129 V 28.510554"
              />
              <path
                id="path2914"
                className={styles.stroke}
                d="m 68.604875,18.561833 v 8.740069"
              />
              <path
                id="path2920"
                className={styles.stroke}
                d="m 75.245858,15.102282 v 9.89718"
              />
              <path
                id="path2926"
                className={styles.stroke}
                d="m 85.42637,15.066969 v 8.736189"
              />
              <path
                id="path2932"
                className={styles.stroke}
                d="M 92.893361,15.103658 V 27.381736"
              />
              <path
                id="path2938"
                className={styles.stroke}
                d="M 101.02291,18.522569 V 31.252555"
              />
              <path
                id="path2944"
                className={styles.stroke}
                d="M 108.49914,15.091946 V 35.105734"
              />
            </g>
          </svg>
        </Modal.Content>
      }
      header={code}
      onClose={() => setIsForestTypeModalOpen(false)}
      onOpen={() => setIsForestTypeModalOpen(true)}
      trigger={<Button active icon="info" />}
    />
  );
}

ForestTypeModal.propTypes = {
  code: PropTypes.string.isRequired,
  setIsForestTypeModalOpen: PropTypes.func.isRequired,
};

export default ForestTypeModal;
