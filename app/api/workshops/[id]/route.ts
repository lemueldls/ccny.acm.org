import { type WebSocket, type WebSocketServer } from "ws";
import { type IncomingMessage } from "http";

export function SOCKET(
  client: WebSocket,
  request: IncomingMessage,
  server: WebSocketServer,
) {
  console.log("A client connected");

  client.on("message", (message) => {
    console.log("Received message:", message);
    client.send(message);
  });

  client.on("close", () => {
    console.log("A client disconnected");
  });
}
