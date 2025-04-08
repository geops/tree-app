function getIsSSR() {
  return typeof window === "undefined";
}
export default getIsSSR;
