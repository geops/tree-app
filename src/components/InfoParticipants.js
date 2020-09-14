import React from 'react';
import { Trans } from 'react-i18next';

const participants = {
  locationBasics:
    'Monika Frehner, Jacques Burnand, Hans-Ueli Frey, Peter Lüscher, Brächt Wasser',
  climateChangeBasics:
    'Monika Frehner, Barabara Huber, Päivi Gubelmann, Nora Zürcher-Gasser, Niklaus E. Zimmermann, Sabine Braun, Martin Scherler, Andreas Zischg, Jacques Burnand, Gabriele Carraro, Harald Bugmann, Achilleas Psomas',
  idea: 'Urs Rutishauser, Monika Frehner, Cornel Broder',
  conception:
    'Monika Frehner, Urs Rutishauser, Cornel Broder, Elke Ehrhardt, Uli Müller, Thomas Bettler, Christian Küchli, Andreas Zischg, Peter Brang',
  projectManagement: 'Peter Brang',
  projectSupervision: 'Pierre Alfter',
  projectControl: 'Marco Ferretti, Christoph Dürr, Ueli Meier',
  wslUsers:
    'Daniel Müller, Noémie Schaffter, Samuel Scheibler, Sabine Augustin, Christoph Dürr, Stéphane Losey, Claudio de Sassi, Pascal Junod, Lukas Glanzmann, Hans-Ulrich Frey, Stefan Biermann, Thomas Studer, Grégory Guichard',
  itUsers:
    'Pierre Cothéreau, Michiel Fehr, Christian Rosset, Viola Sala, Thomas Bettler',
};

function InfoParticipants() {
  return (
    <Trans i18nKey="info.participants">
      <p>introduction</p>
      <p>{{ locationBasics: participants.locationBasics }}</p>
      <p>{{ climateChangeBasics: participants.climateChangeBasics }}</p>
      <p>{{ idea: participants.idea }}</p>
      <p>{{ conception: participants.conception }}</p>
      <p>
        implementation{' '}
        <a href="https://geops.ch/" target="extern">
          geOps AG
        </a>
      </p>
      <p>{{ projectManagement: participants.projectManagement }}</p>
      <p>{{ projectSupervision: participants.projectSupervision }}</p>
      <p>{{ projectControl: participants.projectControl }}</p>
      <p>funding</p>
      <p>{{ wslUsers: participants.wslUsers }}</p>
      <p>{{ itUsers: participants.itUsers }}</p>
    </Trans>
  );
}

export default InfoParticipants;
