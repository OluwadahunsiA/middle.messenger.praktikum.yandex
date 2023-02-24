/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable @typescript-eslint/no-this-alias */
import Block from "../../core/Block";
import template from "./ChatTemplate";
import ChatList from "../../components/ChatListComponent";
import { messages } from "../../mock-data/messages";
import userPicture from "../../assets/images/avatar.avif";
import moreOptions from "../../assets/images/dots.svg";
import MessageInput from "../../components/MessageInputComponent";
import { formEvents } from "../../core/formEvents";

export default class Chats extends Block {
  constructor() {
    const chatList = new ChatList({ messages });
    const messageInput = new MessageInput({
      name: "message",
      id: "message",
      placeholder: "message",
    });
    super({
      userPicture,
      moreOptions,
      messageInput,
      chatList,
      events: {
        focus: formEvents.focus,
        blur: (event: Event) => formEvents.blur(self, event),
      },
    });

    const self = this;
  }

  render() {
    return this.compile(template);
  }
}
