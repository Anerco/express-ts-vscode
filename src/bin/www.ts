#!/usr/src/bin/env node

import http from "http";
import Debug from "debug";
import app from "../app";
import { HttpError } from "http-errors";

const debug = Debug("express-ts:server");

const server = http.createServer(app);

const host = process.env.HOST || "0.0.0.0";
const port = Number(process.env.PORT) || 8080;

app.set("port", port);
app.set("host", host);

server.listen(port, host);

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error: HttpError): void {
  if (error.syscall !== "listen") {
    throw error;
  }

  const bind = typeof port === "string" ? `Pipe ${port}` : `Port ${port}`;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening(): void {
  const addr = server.address();
  const bind = typeof addr === "string" ? `pipe ${addr}` : `port ${addr?.port}`;
  debug(`Listening on ${bind}`);
}

server.on("error", onError);
server.on("listening", onListening);
