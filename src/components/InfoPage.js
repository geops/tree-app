import React from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { Accordion } from 'semantic-ui-react';

import styles from './InfoPage.module.css';

const participants = {
  locationBasics:
    'Monika Frehner, Jacques Burnand, Hans-Ueli Frey, Peter Lüscher, Brächt Wasser',
  climateChangeBasics:
    'Monika Frehner, Barabara Huber, Päivi Gubelmann, Nora Zürcher-Gasser, Niklaus E. Zimmermann, Sabine Braun, Martin Scherler, Andreas Zischg, Jacques Burnand, Gabriele Carraro, Harald Bugmann, Achilleas Psomas',
  idea: 'Urs Rutishauser, Monika Frehner, Cornel Broder',
  conception:
    'Monika Frehner, Urs Rutishauser, Cornel Broder, Elke Ehrhardt, Uli Müller, Thomas Bettler, Christian Küchli, Andreas Zischg, Peter Brang',
  implementation: 'geOps AG',
  projectManagement: 'Peter Brang',
  projectControl: 'Marco Ferretti, Christoph Dürr, Ueli Meier',
  wslUsers:
    'Daniel Müller, Noémie Schaffter, Samuel Scheibler, Sabine Augustin, Christoph Dürr, Stéphane Losey, Claudio de Sassi, Pascal Junod, Lukas Glanzmann, Hans-Ulrich Frey, Stefan Biermann, Thomas Studer, Grégory Guichard',
  itUsers:
    'Pierre Cothéreau, Michiel Fehr, Christian Rosset, Viola Sala, Thomas Bettler',
};

function InfoPage() {
  const { t } = useTranslation();
  const panels = [
    {
      key: 'info.usage',
      title: { content: t('info.usageTitle') },
      content: {
        content: (
          <Trans i18nKey="info.usage">
            <h3>views</h3>
            <p>description</p>
            <h3>map view</h3>
            <p>description</p>
            <h3>location and projection view</h3>
            <p>description</p>
            <h3>glossary</h3>
            <p>description</p>
          </Trans>
        ),
      },
    },
    {
      key: 'info.recommendation',
      title: { content: t('info.recommendationTitle') },
      content: {
        content: (
          <Trans i18nKey="info.recommendation">
            <p>general description</p>
            <p>
              <strong>recommendation</strong> description
            </p>
            <ul>
              <li>positive</li>
              <li>neutral</li>
              <li>negative</li>
              <li>attention</li>
            </ul>
            <h3>scenarios</h3>
            <p>description</p>
            <ul>
              <li>today</li>
              <li>moderate</li>
              <li>extreme</li>
            </ul>
            <p>tabs</p>
            <ul>
              <li>three</li>
              <li>one</li>
              <li>two</li>
            </ul>
            <p>description</p>
          </Trans>
        ),
      },
    },
    {
      key: 'info.participants',
      title: { content: t('info.participantsTitle') },
      content: {
        content: (
          <Trans i18nKey="info.participants">
            <p>introduction</p>
            <p>{{ locationBasics: participants.locationBasics }}</p>
            <p>{{ climateChangeBasics: participants.climateChangeBasics }}</p>
            <p>{{ idea: participants.idea }}</p>
            <p>{{ conception: participants.conception }}</p>
            <p>{{ implementation: participants.implementation }}</p>
            <p>{{ projectManagement: participants.projectManagement }}</p>
            <p>{{ projectControl: participants.projectControl }}</p>
            <p>funding</p>
            <p>{{ wslUsers: participants.wslUsers }}</p>
            <p>{{ itUsers: participants.itUsers }}</p>
          </Trans>
        ),
      },
    },
    {
      key: 'info.reports',
      title: { content: t('info.reportsTitle') },
      content: {
        content: (
          <ul>
            <li>
              <a
                href="https://www.research-collection.ethz.ch/handle/20.500.11850/156262/eth-50707-01.pdf"
                target="reports"
              >
                Huber B, Zischg A, Burnand J, Frehner M, Carraro G. 2015. Mit
                welchen Klimaparametern kann man Grenzen plausibel erklären, die
                in NaiS (Nachhaltigkeit und Erfolgskontrolle im Schutzwald)
                verwendet werden um Ökogramme auszuwählen? Schlussbericht des
                Projektes im Forschungsprogramm &quot;Wald und Klimawandel&quot;
                des Bundesamtes für Umwelt BAFU, Bern und der Eidg.
                Forschungsanstalt WSL, Birmensdorf
              </a>
            </li>
            <li>
              <a
                href="https://www.research-collection.ethz.ch/handle/20.500.11850/341108"
                target="reports"
              >
                Frehner M, Huber B; mit Beiträgen von Gubelmann P (Teil 1 und
                3), Zürcher-Gasser N (Teil 4 und 5), Zimmermann NE (Teil 3),
                Braun S (Teil 2), Scherler M (Teil 2), Zischg A (Teil 1),
                Burnand J (Teil 1), Carraro G (Teil 1), Bugmann H (Teil 3),
                Psomas A (Teil 3). 2019. Schlussbericht des Projektes
                «Adaptierte Ökogramme» im Forschungsprogramm «Wald und
                Klimawandel»: Übersicht über die Teilberichte. Sargans,
                Forstingenieurbüro Frehner und Chur, Abenis AG
              </a>
            </li>
            <li>
              <a
                href="https://www.research-collection.ethz.ch/handle/20.500.11850/341108/AdaptierteOekogramme_EndberichtTeil1_inkl_Anhang_20190430_inkl_LesehilfeV2.pdf"
                target="reports"
              >
                Gubelmann P, Huber B, Frehner M, Zischg A, Burnand J, Carraro G.
                2019. Schlussbericht des Projektes «Adaptierte Ökogramme» im
                Forschungsprogramm «Wald und Klimawandel», Teil 1:
                Quantifizierung und Verschiebung der Höhenstufengrenzen sowie
                des Tannen- und Buchenareals in der Schweiz mit zwei
                Klimazukünften. Chur, Abenis AG. 194 S
              </a>
            </li>
            <li>
              <a
                href="https://www.research-collection.ethz.ch/handle/20.500.11850/341108/AdaptierteOekogramme_EndberichtTeil5_20190430.pdf"
                target="reports"
              >
                Frehner M, Zürcher-Gasser N. 2019. Schlussbericht des Projektes
                «Adaptierte Ökogramme» im Forschungsprogramm «Wald und
                Klimawandel», Teil 5: «Herleitung von Klima angepassten
                Baumartenempfehlungen für Schweizer Wälder». Sargans,
                Forstingenieurbüro Frehner und Rabius, Gadola AG. 24 S
              </a>
            </li>
            <li>
              <a
                href="http://www.gebirgswald.ch/de/nais-download.html"
                target="reports"
              >
                Frehner M, Wasser B, Schwitter R. 2005/09. Nachhaltigkeit und
                Erfolgskontrolle im Schutzwald. Wegleitung für Pflegemassnahmen
                in Wäldern mit Schutzfunktion. Bern, Bundesamt für Umwelt
              </a>
            </li>
            <li>
              <a
                href="https://www.wsl.ch/de/publikationen/standortkundliche-grundlagen-fuer-die-waldbewirtschaftung-im-klimawandel.html"
                target="reports"
              >
                Frehner M, Brang P, Kaufmann G, Küchli C. 2018.
                Standortkundliche Grundlagen für die Waldbewirtschaftung im
                Klimawandel. WSL Ber. 66: 43 S
              </a>
            </li>
            <li>Schlussbericht Projekt NaiS-LFI (folgt)</li>
          </ul>
        ),
      },
    },
    {
      key: 'info.impressum',
      title: { content: t('info.impressumTitle') },
      content: {
        content: t('info.impressum'),
      },
    },
  ];
  return (
    <div className={styles.page}>
      <Accordion panels={panels} styled />
    </div>
  );
}

export default InfoPage;
