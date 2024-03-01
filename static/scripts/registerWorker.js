async function registerSW() {
    await navigator.serviceWorker.register("./sw.js", {
        scope: __uv$config.prefix,
    });
}