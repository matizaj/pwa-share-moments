if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("../../sw.js").then((response) => {
    console.log("[Appjs] registered", response);
  });
}
