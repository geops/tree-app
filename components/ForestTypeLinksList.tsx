import ForestTypeLink from "./ForestTypeLink";

import type {
  BlForestType,
  ForestType,
  LuForestType,
} from "@geops/tree-lib/types";

type LinkListForestType = BlForestType | ForestType | LuForestType;

function ForestTypeLinksList({
  forestTypes,
  onClick,
}: {
  forestTypes: LinkListForestType[];
  onClick: (evt: React.MouseEvent, code: string) => void;
}) {
  if (!forestTypes?.length) {
    return "-";
  }

  return forestTypes.map(({ code, de }) => (
    <div key={code}>
      <ForestTypeLink code={code} onClick={onClick}>
        {code} - {de}
      </ForestTypeLink>
    </div>
  ));
}

export default ForestTypeLinksList;
