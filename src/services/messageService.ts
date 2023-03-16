/* eslint-disable @typescript-eslint/no-non-null-assertion */
import Store from "../core/Store";
import UseWebSocket from "../core/WS";
import ChatService from "./chatService";

import { WWS_URL } from "../core/HTTP";
import { Message, StoreInterface } from "../types";

class MessageService {
  socket: UseWebSocket;

  sockets: { [id: string]: UseWebSocket } = {};

  async connect(chatId: number, token: string, newMessages: string) {
    this.close();

    const store = Store.getState() as StoreInterface;

    const userId = store.user!.id;

    this.socket = new UseWebSocket(`${WWS_URL}/${userId}/${chatId}/${token}`);

    await this.socket.connect();

    this.sockets[chatId] = this.socket;

    this.addEvents(chatId);

    this.getOldMessages(newMessages);
  }

  sendMessage(content: string) {
    this?.socket?.send({ type: "message", content });
  }

  getOldMessages(newMessages?: string | undefined) {
    this.socket.send({ type: "get old", content: newMessages || "0" });
  }

  setMessages(chatId: number, messages: Message | Message[]) {
    let newMessages = [];

    if (Array.isArray(messages)) {
      newMessages = messages.reverse();
    } else {
      newMessages.push(messages);
    }

    const currentMessages = (Store.getState().messages || {})[chatId] || [];

    newMessages = [...newMessages, ...currentMessages];

    const stringNewMessages = newMessages.map((message) =>
      JSON.stringify(message)
    );
    const uniqueString = [...new Set(stringNewMessages)];
    const uniqueNewMessages = uniqueString.map((string) => JSON.parse(string));

    Store.setState(`messages.${chatId}`, uniqueNewMessages);

    ChatService.getChats();
  }

  close() {
    const sockets = Object.keys(this.sockets);

    if (sockets.length) {
      sockets.forEach((id: string) => {
        this.sockets[id].close();

        delete this.sockets[id];

        Store.setState(`messages.${id}`, []);
      });
    }
  }

  addEvents(chatId: number) {
    this.socket.on("websocket-message", (message: Message | Message[]) => {
      this.setMessages(chatId, message);
    });

    this.socket.on("websocket-closed", () => {
      this.close();
    });
  }
}

export default new MessageService();
