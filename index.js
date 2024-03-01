const config = require("./config.json");
const express = require("express");
const { uvPath } = require("@titaniumnetwork-dev/ultraviolet");
const { createBareServer } = require("@tomphttp/bare-server-node");
const http = require("http");

const bare = createBareServer("/bare/");
const server = http.createServer();

const app = express();
app.use(express.static("static"));
app.use("/uv/", express.static(uvPath));

server.on("request", (req, res) => {
    if (bare.shouldRoute(req)) {
        bare.routeRequest(req, res);
        return;
    }
    app(req, res);
});

server.on("upgrade", (req, socket, head) => {
    if (bare.shouldRoute(req)) {
        bare.routeUpgrade(req, socket, head);
        return;
    }
    socket.end();
});

const port = config.port || 8080;

server.on("listening", () => {
    const address = server.address();
    console.log([
        "XProxy v1.0.0",
        `Listening @ :${address.port}`
    ].join("\n"));
});

server.listen(port);