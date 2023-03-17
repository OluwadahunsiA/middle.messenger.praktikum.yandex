/* eslint-disable @typescript-eslint/no-non-null-assertion */
import Store from "../core/Store";
import UseWebSocket from "../core/WS";
import ChatController from "./chatController";

import { WWS_URL } from "../core/HTTP";
import { Message, StateInterface } from "../types";

class MessageController {
  socket: UseWebSocket;

  sockets: { [id: string]: UseWebSocket } = {};

  async connect(chatId: number, token: string, newMessages: string) {
    this.close();

    const store = Store.getState() as StateInterface;

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
    let newMessages: any = [];

    if (Array.isArray(messages)) {
      newMessages = messages.reverse();
    } else {
      newMessages.push(messages);
    }

    const currentMessages = (Store.getState().messages || {})[chatId] || [];


    if (newMessages.length === 1 && currentMessages.length !== 1) {
      newMessages = [...currentMessages, ...newMessages];
    } else if (newMessages.length !== 1 && currentMessages.length === 1) {
      newMessages = [...currentMessages, ...newMessages];
    } else if (
      newMessages.length === 1 &&
      currentMessages.length === 1 &&
      newMessages[0].id !== currentMessages[0].id
    ) {
      newMessages = [...currentMessages, ...newMessages];
    } else if (newMessages.length > 1 && currentMessages.length === 0) {
      newMessages = [...newMessages];
    } else {
      newMessages = [...currentMessages];
    }

    Store.setState(`messages.${chatId}`, newMessages);

    ChatController.getChats();
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
    this.socket.on("new-websocket-message", (message: Message | Message[]) => {
      this.setMessages(chatId, message);
    });

    this.socket.on("close-websocket", () => {
      this.close();
    });
  }
}

export default new MessageController();
