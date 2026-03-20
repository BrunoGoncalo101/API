import dotenv from "dotenv";
import app from "./app.js";
import env from "./config/env.js";
import http from "http";
import { initWebSocket } from "./websockets/websockets.js";


const port =  env.port || 3000;
const host = env.host || "localhost";

// Cria o servidor HTTP
const server = http.createServer(app);

//inicializa o WebSocket
const wss = initWebSocket(server);

//Guarda a instância do WebSocket no app para uso posterior
app.set("wss", wss);


// Inicia o servidor HTTP
server.listen(port, host, () => {
  console.log(`Servidor a correr em http://${host}:${port}`);
});
