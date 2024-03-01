const searchInput = document.getElementById("search-input");
searchInput.addEventListener("keyup", async(event) => {
    if (event.key !== "Enter") {
        return;
    }
    event.preventDefault();
    await registerSW();
    window.location.href = __uv$config.prefix + __uv$config.encodeUrl(
        new URL(searchInput.value).toString()
    );
});
