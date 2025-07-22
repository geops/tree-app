const treeTypeFileName = "dendrologie_artenportraits_1.0.1_{name}_d";

function getTreeTypePdfUrl(treeTypeLatin: string): string {
  const treePdfEndpoint = process.env.NEXT_PUBLIC_TREE_PDF_ENDPOINT;
  return `${treePdfEndpoint}/${treeTypeFileName.replace("{name}", treeTypeLatin)}.pdf`;
}

export default getTreeTypePdfUrl;
