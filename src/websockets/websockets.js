import { WebSocketServer } from "ws";

export const initWebSocket = (server) => {

    // Cria o servidor WebSocket
    const wss = new WebSocketServer({ server });

    // Lida com conexões WebSocket
    wss.on("connection", (ws) => {
        console.log("Cliente WebSocket ligado");

        // Envia uma mensagem de boas-vindas ao cliente
        ws.send(
        JSON.stringify({
            type: "welcome",
            message: "Ligação estabelecida",
        }),
        );

        // Lida com mensagens recebidas do cliente
        ws.on("message", (message) => {
        console.log("Mensagem:", message.toString());
        });

        // Lida com o fecho da conexão
        ws.on("close", () => {
        console.log("Cliente desligado");
        });
    });
    return wss;
};

// Função para enviar mensagens a todos os clientes conectados
export const broadcastMessage = (wss, data) => {
    if (!wss) return;

    // Envia a mensagem a todos os clientes conectados
    wss.clients.forEach((client) => {
        if (client.readyState === 1) {
        client.send(JSON.stringify(data));
        }
    });
};
