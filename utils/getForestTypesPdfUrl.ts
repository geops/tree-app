const soPdfEndpoint = process.env.NEXT_PUBLIC_SO_PDF_ENDPOINT;

function getForestTypePdfUrl(forestType: string, url = soPdfEndpoint): string {
  return `${url}/${forestType?.replace("*", "stern")}.pdf`;
}
export default getForestTypePdfUrl;
