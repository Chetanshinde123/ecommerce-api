// ------------- Common JS type Method --------
// const http = require("http")
// const app = require("./app/app")

// ---------- Module Type ------------
import http from "http";
import app from "./app/app.js";

const PORT = process.env.PORT || 8001;
const server = http.createServer(app);
server.listen(PORT, console.log("Server running on", PORT));
