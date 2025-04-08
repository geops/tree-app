function removeIdUrlParam() {
  const url = new URL(window.location.href);
  url.searchParams.delete("id");
  window.history.replaceState({}, "", url);
}

export default removeIdUrlParam;
