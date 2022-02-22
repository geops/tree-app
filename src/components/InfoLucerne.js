import React from 'react';

import DataTable from './ForestTypeModal/ForestTypeDescription/DataTable';

const bodenLabels = [
  'Merkmal vereinzelt sichtbar',
  'Merkmal meist sichtbar, aber schwach ausgebildet',
  'Merkmal meist sichtbar, deutlich ausgebildet',
];
const vegetationLabels = [
  'Arten der Gruppe kommen vereinzelt vor',
  'Arten der Gruppe kommen regelmässig, aber mit kleiner Deckung vor',
  'Arten aus der Gruppe kommen regelmässig und mit grosser Deckung vor',
];
const tableData = [1, 2, 3];

export default function InfoLucerne() {
  return (
    <div>
      <h3>Waldbau im Kanton Luzern</h3>
      <p>
        Der Wald ist so zu bewirtschaften, dass er seine Funktionen dauernd und
        nachhaltig erfüllen kann. Dabei gilt es verschiedene Grundgedanken
        betreffend standortsgerechten Beständen, Baumartenspektrum,
        Naturverjüngung, Bestandesstruktur, Lebensraum und
        Bewirtschaftungsformen zu berücksichtigen. Auch Klima, Geologie und
        Boden spielen eine wichtige Rolle.
      </p>
      <p>
        In folgendem Dokument sind diese Grundgedanken mit allgemeiner
        Gültigkeit in der Form praktischer Richtlinien formuliert:{' '}
        <a
          href="https://lawa.lu.ch/-/media/LAWA/Dokumente/Wald/waldplanung/Grundlagen/AN_Kommentar_Waldbau_2021.pdf"
          target="info-lucerne"
        >
          Waldbaukommentar Luzern
        </a>
      </p>
      <p>
        Der Waldbaukommentar ist ein Hilfsmittel für waldbauliche Entscheide.
        Eine gesamtheitliche Abwägung der Handlungsoptionen nach den Leitfragen
        „Woher kommst du?“, „Wo stehst du?“ und „Wo will ich dich haben?“ ist
        und bleibt die Kernkompetenz der Forstfachperson.
      </p>
      <h3>Standortypen und Gesellschaftsgruppen</h3>
      <p>
        Die Beschreibungen zu den Standortstypen umfassen die Empfehlungen, die
        gezielt auf den einzelnen Standort bezogen sind. Sie beschreiben die
        ‚natürlich-potenzielle Vegetation’ und geben detailliert darüber
        Auskunft, (a) wie ein Standortstyp erkannt werden kann und (b) durch
        welche Pflanzenarten und Bodenmerkmale dieser charakterisiert ist. Zu
        beachten ist, dass bei standortsfremden Beständen die Krautschicht oft
        stark verändert oder verarmt ist. Hier ist die Beurteilung des Bodens
        besonders wichtig. Ähnliche Standortstypen werden in
        Gesellschaftsgruppen zusammengefasst.
      </p>
      <h3>Baumartenzusammensetzung</h3>
      <h4>Laubholz- (Lbh min./opt) resp. Tannenanteil (Tanne min./opt.):</h4>
      <p>
        Mit der Einhaltung des Minimal-Anteils kann davon ausgegangen werden,
        dass sich der Wald langfristig positiv entwickelt. Mit dem Optimal-Wert
        kann ein Bestand die Zielsetzungen in optimaler Weise erfüllen.
        <br />
        Der empfohlene Mindestwert entspricht dabei nicht einer klaren
        ‚Bruchstelle’, unterhalb derer sofort eine negative Entwicklung
        einsetzt. Der Prozentwert für die einzelnen Baumarten ist als Richtwert
        zu verstehen. Für die Förderung eher seltener Baumarten und für den
        Anbau von Gastbaumarten kann der vorhandene Spielraum ausgenutzt werden.
      </p>
      <h4>Naturwald (NW):</h4>
      <p>
        Der naturnahe Waldbau orientiert sich an der Baumartenmischung, die sich
        durch die natürliche Konkurrenz einstellt. Die Zahlen entsprechen
        Prozentwerten in Bezug auf die Gesamtdeckung aller Baumarten. Die Werte
        beziehen sich auf die Mischung in einem 50-jährigen Baumbestand, was
        meist einem Baumholz 1 entspricht. Die Prozentwerte geben das Spektrum
        an, das die einzelne Baumart in der Regel erreicht. Die weiteren
        Erläuterungen in Textform geben Präzisierungen zu den Angaben in der
        Tabelle.
      </p>
      <h4>Wirtschaftswald (WW):</h4>
      <p>
        Für Standortstypen mit wirtschaftlicher Bedeutung gibt es zusätzlich
        eine Empfehlung Wirtschaftswald (WW). Hier wird die Bandbreite genannt,
        die aus fachlicher Sicht empfohlen werden kann. Die fachliche Sicht
        stützt sich auf die physiologischen Möglichkeiten jeder Baumart, deren
        Konkurrenzkraft in dieser Gesellschaft, die Vermeidung hoher
        Produktionsrisiken und die Erhaltung der Bodenfruchtbarkeit.
      </p>
      <h3>Vegetationstabelle</h3>
      <DataTable
        data={tableData}
        getLabel={(index) => vegetationLabels[index]}
      />
      <br />
      <p>≠ 7: Unterscheidung zur Gesellschaft 7.</p>
      <h3>Bodentabelle</h3>
      <DataTable data={tableData} getLabel={(index) => bodenLabels[index]} />
      <br />
      <p>
        Hinweis zur Streuauflage (L): Die Umschreibung bezieht sich auf den
        Zustand im Hochsommer.
      </p>
      <h3>Exposition und Neigung</h3>
      <p>
        Die Prozentwerte geben die Hangneigungen an.
        <br />
        Der dunkle Bereich zeigt die Hauptverbreitung, der helle die übrige
        Verbreitung.
      </p>
      <h3>Relief</h3>
      <p>
        Die Darstellung zeigt die typische Lage im Gelände an.
        <br />
        Die Sonne zeigt den Süden an und erscheint, falls alle betrachteten
        Einheiten in Süd- oder Nordlage eingeteilt werden können.
      </p>
      <h3>Abkürzungen</h3>
      <p>
        SS: Strauchschicht
        <br />
        KS: Krautschicht
        <br />
        MS: Moosschicht
        <br />
        PR: Produktion
        <br />
        NG: Naturgefahren
        <br />
        NS: Naturschutz
        <br />
        NW: Naturwald
        <br />
        WW: Wirtschaftswald
      </p>
      <p>
        Lbh min.: Minimaler Laubholzanteil
        <br />
        Lbh opt.: Optimaler Laubholzanteil
        <br />
        Tanne min.: Minimaler Tannenanteil
        <br />
        Tanne opt.: Optimaler Tannenanteil
      </p>
    </div>
  );
}

InfoLucerne.title = 'Waldbaukommentar Luzern';
