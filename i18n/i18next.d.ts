import resources from "./resources";

import "i18next";

declare module "i18next" {
  interface CustomTypeOptions {
    defaultNS: "common";
    resources: {
      de: typeof resources.de.translation;
      fr: typeof resources.fr.translation;
    };
  }
}

export type TreeAppLanguage = keyof typeof resources;
