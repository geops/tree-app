import React from 'react';
import { ListItem, Icon, List } from 'semantic-ui-react';

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
      <List bulleted style={{ marginLeft: 30 }}>
        <ListItem>
          TreeApp, hinterlegt mit der Solothurner Standortskartierung
        </ListItem>
        <ListItem>
          Standort-Steckbriefe und offizielle Solothurner Baumartenempfehlung
          für alle rund 60 waldbaulich relevanten Solothurner Waldgesellschaften
        </ListItem>
      </List>
      <p>
        Der Bericht «Waldbauliche Empfehlungen des Kantons Solothurn» erläutert
        die beiden Werkzeuge und stellt sie in Relation zueinander. Darüber
        hinaus werden darin die waldbaulichen Strategien des Kantons besprochen
        und die Baumarten der Zukunft, darunter auch nicht-heimische Baumarten,
        diskutiert.
      </p>
      <p>
        <a
          href="https://so.ch/fileadmin/internet/vwd/vwd-awjf-wald/pdf/Biodiversitaet/Standort-Steckbriefe_Solothurn.pdf"
          rel="noopener noreferrer"
          target="_blank"
        >
          Standort-Steckbriefe_Solothurn.pdf&nbsp;&nbsp;&nbsp;
          <Icon name="external alternate" />
        </a>
      </p>
    </div>
  );
}

InfoSolothurn.title = 'Waldbauliche Empfehlungen Solothurn';
