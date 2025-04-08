import DataTable from "../DataTable";

const indicatorLabels = [
  "Artengruppe sicher mit einer oder mehreren Arten vertreten",
  "Artengruppe oft vertreten",
  "Artengruppe manchmal mit einer oder zwei Arten vertreten",
  "Artengruppe darf nicht vorkommen",
];
const tableData = [3, 2, 1, 4];

export default function InfoBasel() {
  return (
    <div>
      <h3>Waldbaukommentar beider Basel</h3>
      <p>
        Der Wald ist nachhaltig zu bewirtschaften, so dass er seine biologische
        Vielfalt, Produktivität, Erneuerungsfähigkeit und Vitalität beibehalten
        kann. Dabei müssen verschiedene Grundgedanken betreffend
        standortsgerechten Beständen, Baumartenspektrum, Naturverjüngung,
        Bestandesstruktur, Lebensraum und Bewirtschaftungsformen berücksichtigt
        werden. Klima, Höhenlage, Geologie und Boden spielen ebenfalls eine
        wichtige Rolle.
      </p>
      <p>
        Der Waldbaukommentar ist ein Hilfsmittel für waldbauliche Entscheide.
        Eine gesamtheitliche Abwägung der Handlungsoptionen ist und bleibt die
        Kernkompetenz der Forstfachpersonen.
      </p>
      <h3>Standortstypen und Gesellschaftsgruppen</h3>
      <p>
        Die Beschreibungen zu den Standortstypen umfassen die waldbaulichen
        Empfehlungen, die gezielt auf den einzelnen Standort bezogen sind. Sie
        beschreiben kurz bildhaft das Erscheinungsbild und geben detaillierter
        darüber Auskunft, (a) durch welche Eigenschaften der einzelne
        Standortstyp charakterisiert werden kann, (b) welche waldbaulichen
        Massnahmen in den einzelnen Standortstypen empfohlen werden und (c)
        welche Pflanzenarten und Bodenmerkmale jeweils typisch sind. Zu beachten
        ist, dass bei standortsfremden Beständen die Krautschicht oft stark
        verändert oder verarmt ist.
      </p>
      <h3>Waldgesellschaftsgruppen</h3>
      <p>
        Hier werden die einzelnen Standortstypen in grössere
        ökologisch-waldbauliche Gruppen zusammengefasst. Diese sind durch
        geteilte Höhenstufen, dominante Baumarten und Standortseigenschaften
        sowie ein relativ ähnliches Erscheinungsbild charakterisiert. Zusätzlich
        werden für alle Waldgesellschaftsgruppen die Anteile an der Gesamtfläche
        der beiden Basel sowohl in Prozent als auch in ha angegeben.
      </p>
      <h3>Baumartenwahl und -zusammensetzung</h3>
      Mit der Einhaltung des angegebenen prozentualen Laubholzanteils kann davon
      ausgegangen werden, dass sich der Wald langfristig positiv entwickelt.
      Zusätzlich ist ersichtlich in welcher «Rolle» die einzelnen Baumarten in
      den jeweiligen Standorten vertreten sein sollten. Hier wird zwischen
      «Hauptbaumarten», «Nebenbaumarten», «Gastbaumarten» und Bäumen die
      vereinzelt mitgepflegt werden können, unterschieden.
      <h3>Waldbauliche Empfehlungen</h3>
      <p>
        In den Abschnitten «Eigenschaften», «Bestockungsziele», «Verjüngung und
        Entwicklung» und «Pflege» werden wichtige waldbauliche Informationen zu
        den standortsspezifischen Eigenschaften und den empfohlenen Massnahmen
        gegeben.
      </p>
      <h3>Waldbild</h3>
      <p>
        Im Abschnitt «Beschrieb Waldbild» wird der Aufbau der Bestände sowie der
        vermittelte Eindruck kurz deskriptiv skizziert.
      </p>
      <h3>Übergänge</h3>
      <p>
        Dieser Abschnitt gibt eine kurze Auflistung der Standortstypen, zu
        welchen Übergängen diese häufig anzutreffen sind.
      </p>
      <h3>Höhenverbreitung</h3>
      <p>
        Zeigt die Höhenstufen, in welchen der Standortstyp grundsätzlich
        anzutreffen ist. Zusätzlich wird eine kantonsspezifische Höhenangabe
        angegeben. Die angegebenen Zahlen beziehen sich jeweils auf die
        Höhenverbreitung (m.ü.M.).
      </p>
      <h3>Standort und Geologie</h3>
      <p>
        In diesen Abschnitten werden kurz das Relief, die klimatischen
        Bedingungen, die Bodenverhältnisse und die geologische Beschaffenheit
        beschrieben.
      </p>
      <h3>Relief</h3>
      <p>
        Die Darstellung zeigt die Lage im Gelände an, auf welcher der
        entsprechende Standortstyp typischerweise zu finden ist.
      </p>
      <h3>Hangneigung und Exposition</h3>
      <p>Die Prozentwerte geben die Hangneigungen an.</p>
      <h3>Zeigerpflanzen</h3>
      <p>
        Für jeden Standortstyp wird eine Übersicht gegeben, welche
        Zeigerarten-Gruppen typischerweise vorkommen oder nicht vorkommen
        dürfen.
      </p>
      <DataTable
        data={tableData}
        getLabel={(index) => indicatorLabels[index]}
      />
      <br />
      <p>
        Die Kombination dieser Zeigerpflanzen-Gruppen ist für jeden Standort
        (Ausnahme sind Übergangsstandorte) individuell, respektive einmalig.
      </p>
      <h3>Abkürzungen</h3>
      <p>
        BS: Baumschicht
        <br />
        SS: Strauchschicht
        <br />
        KS: Krautschicht
        <br />
        MS: Moosschicht
      </p>
    </div>
  );
}

InfoBasel.title = "Waldbaukommentar Basel";
