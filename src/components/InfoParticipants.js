import React from 'react';
import { Trans } from 'react-i18next';

const participants = {
  locationBasics:
    'Monika Frehner, Jacques Burnand, Hans-Ueli Frey, Peter Lüscher, Brächt Wasser',
  climateChangeBasics:
    'Monika Frehner, Barbara Huber, Päivi Gubelmann, Nora Zürcher-Gasser, Niklaus E. Zimmermann, Sabine Braun, Martin Scherler, Andreas Zischg, Jacques Burnand, Gabriele Carraro, Harald Bugmann, Achilleas Psomas',
  forestTypeMap: 'Michiel Fehr, Daniel Oertig',
  idea: 'Urs Rutishauser, Monika Frehner, Cornel Broder',
  conception:
    'Monika Frehner, Urs Rutishauser, Cornel Broder, Elke Erhardt, Uli Müller, Thomas Bettler, Christian Küchli, Andreas Zischg, Peter Brang †',
  projectManagement: 'Robert Jenni',
  projectSupervision: 'Kathrin Streit',
  projectControl: 'Marco Ferretti, Christoph Dürr, Ueli Meier',
  wslUsers:
    'Sabine Augustin, Thomas Bettler, Stefan Biermann, Pierre Cothéreau, Christoph Dürr, Michiel Fehr, Hans-Ulrich Frey, Lukas Glanzmann, Grégory Guichard, Pascal Junod, Stéphane Losey, Daniel Müller, Christian Rosset, Viola Sala, Claudio de Sassi, Noémie Schaffter, Samuel Scheibler, Thomas Studer',
};

function InfoParticipants() {
  return (
    <Trans i18nKey="info.participants">
      <p>introduction</p>
      <p>{{ locationBasics: participants.locationBasics }}</p>
      <p>{{ climateChangeBasics: participants.climateChangeBasics }}</p>
      <p>{{ forestTypeMap: participants.forestTypeMap }}</p>
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
    </Trans>
  );
}

export default InfoParticipants;
