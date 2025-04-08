// Source: https://coderwall.com/p/i817wa/one-line-function-to-detect-mobile-devices-with-javascript
function getIsMobileDevice() {
  return (
    typeof window.orientation !== "undefined" ||
    navigator.userAgent.includes("IEMobile")
  );
}

export default getIsMobileDevice;
