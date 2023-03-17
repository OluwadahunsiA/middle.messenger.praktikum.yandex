import EventBus from "./EventBus";

export default class UseWebSocket extends EventBus {
  socket: WebSocket;

  pingInterval = 4000;

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
      this.on("open-websocket", () => {
        resolve();
      });

      this.on("close-websocket", () => {
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

  ping() {
    const ping = setInterval(() => {
      this.send({ type: "ping" });
    }, this.pingInterval);

    this.on("close-websocket", () => {
      clearInterval(ping);
      this.pingInterval = 0;
    });
  }

  close() {
    this.socket.close();
  }

  addEvents() {
    this.socket.addEventListener("open", () => {
      this.emit("open-websocket");
    });

    this.socket.addEventListener("close", () => {
      this.emit("close-websocket");
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

      this.emit("new-websocket-message", data);
    });
  }
}
