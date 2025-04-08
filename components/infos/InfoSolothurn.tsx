import { ArrowTopRightOnSquareIcon } from "@heroicons/react/16/solid";

export default function InfoSolothurn() {
  return (
    <div>
      <p>
        Eine bedeutende Frage im Waldbau der heutigen Zeit lautet: Auf welche
        Baumarten müssen die Försterinnen und Waldeigentümer heute setzen, damit
        ein stabiler und zukunftsfähiger Waldbestand heranwächst? Ein Wald also,
        welcher gegen Ende des 21. Jahrhunderts die verschiedenen Waldfunktionen
        erfüllen kann – in einem Klima, welches sich innerhalb dieser einen
        Baumgeneration stark verändern wird? Der Kanton Solothurn stellt
        hinsichtlich dieser herausfordernden Fragestellung zwei Werkzeuge zur
        Verfügung:
      </p>
      <ul className="mb-5 flex list-disc flex-col gap-5 pl-8">
        <li>TreeApp, hinterlegt mit der Solothurner Standortskartierung</li>
        <li>
          Standort-Steckbriefe und offizielle Solothurner Baumartenempfehlung
          für alle rund 60 waldbaulich relevanten Solothurner Waldgesellschaften
        </li>
      </ul>
      <p>
        Der Bericht «Waldbauliche Empfehlungen des Kantons Solothurn» erläutert
        die beiden Werkzeuge und stellt sie in Relation zueinander. Darüber
        hinaus werden darin die waldbaulichen Strategien des Kantons besprochen
        und die Baumarten der Zukunft, darunter auch nicht-heimische Baumarten,
        diskutiert.
      </p>
      <p>
        <a
          className="flex items-center"
          href="https://so.ch/fileadmin/internet/vwd/vwd-awjf-wald/pdf/Biodiversitaet/Bericht_Waldbauliche_Empfehlungen_Solothurn.pdf"
          rel="noopener noreferrer"
          target="_blank"
        >
          Bericht Waldbauliche Empfehlungen Solothurn&nbsp;&nbsp;
          <ArrowTopRightOnSquareIcon className="h-5 w-5" />
        </a>
      </p>
    </div>
  );
}

InfoSolothurn.title = "Waldbauliche Empfehlungen Solothurn";
