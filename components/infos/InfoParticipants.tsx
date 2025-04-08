import { Trans } from "react-i18next";

const participants = {
  climateChangeBasics:
    "Monika Frehner, Barbara Huber, Päivi Gubelmann, Nora Zürcher-Gasser, Niklaus E. Zimmermann, Sabine Braun, Martin Scherler, Andreas Zischg, Jacques Burnand, Gabriele Carraro, Harald Bugmann, Achilleas Psomas",
  conception:
    "Monika Frehner, Urs Rutishauser, Cornel Broder, Elke Erhardt, Uli Müller, Thomas Bettler, Christian Küchli, Andreas Zischg, Peter Brang †",
  forestTypeMap: "Michiel Fehr, Daniel Oertig",
  idea: "Urs Rutishauser, Monika Frehner, Cornel Broder",
  locationBasics:
    "Monika Frehner, Jacques Burnand, Hans-Ueli Frey, Peter Lüscher, Brächt Wasser",
  projectControl: "Marco Ferretti, Christoph Dürr, Ueli Meier",
  projectManagement: "Robert Jenni",
  projectSupervision: "Kathrin Streit",
  wslUsers:
    "Sabine Augustin, Thomas Bettler, Stefan Biermann, Pierre Cothereau, Christoph Dürr, Michiel Fehr, Hans-Ulrich Frey, Lukas Glanzmann, Grégory Guichard, Pascal Junod, Stéphane Losey, Daniel Müller, Christian Rosset, Viola Sala, Claudio de Sassi, Noémie Schaffter, Samuel Scheibler, Thomas Studer",
};

function InfoParticipants() {
  return (
    <Trans
      i18nKey="info.participants"
      values={{
        climateChangeBasics: participants.climateChangeBasics,
        conception: participants.conception,
        forestTypeMap: participants.forestTypeMap,
        idea: participants.idea,
        locationBasics: participants.locationBasics,
        projectControl: participants.projectControl,
        projectManagement: participants.projectManagement,
        projectSupervision: participants.projectSupervision,
        wslUsers: participants.wslUsers,
      }}
    >
      <p>introduction</p>
      <p>locationBasics</p>
      <p>climateChangeBasics</p>
      <p>forestTypeMap</p>
      <p>idea</p>
      <p>conception</p>
      <p>implementation</p>
      <p>projectManagement</p>
      <p>projectSupervision</p>
      <p>projectControl</p>
      <p>funding</p>
      <p>wslUsers</p>
      <a href="https://geops.ch" rel="noopener noreferrer" target="_blank">
        geOps AG
      </a>
    </Trans>
  );
}

export default InfoParticipants;
