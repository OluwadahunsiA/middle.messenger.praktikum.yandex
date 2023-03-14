import EventBus from "./EventBus";

export default class UseWebSocket extends EventBus {
  socket: WebSocket;

  pingInterval = 3000;

  url: string;

  constructor(url: string) {
    super();
    this.url = url;
  }

  connect(): Promise<void> {
    this.socket = new WebSocket(this.url);

    this.addEvents();

    this.ping();

    return new Promise((resolve, reject) => {
      this.on("websocket-opened", () => {
        resolve();
      });

      this.on("websocket-closed", () => {
        reject();
      });
    });
  }

  send(data: unknown) {
    if (!this.socket) {
      throw new Error("Please connect socket");
    }

    this.socket.send(JSON.stringify(data));
  }

  close() {
    this.socket.close();
  }

  ping() {
    const ping = setInterval(() => {
      this.send({ type: "ping" });
    }, this.pingInterval);

    this.on("websocket-closed", () => {
      clearInterval(ping);
      this.pingInterval = 0;
    });
  }

  addEvents() {
    this.socket.addEventListener("open", () => {
      this.emit("websocket-opened");
    });

    this.socket.addEventListener("close", () => {
      this.emit("websocket-closed");
    });

    this.socket.addEventListener("error", (error) => {
      this.emit("websocket-error", error);
    });

    this.socket.addEventListener("message", (message) => {
      const data = JSON.parse(message.data);

      if (data.type && data.type === "pong") {
        return;
      }

      if (data.type === "user connected") {
        return;
      }

      this.emit("websocket-message", data);
    });
  }
}
