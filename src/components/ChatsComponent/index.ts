/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable @typescript-eslint/no-this-alias */
import Block from "../../core/Block";
import template from "./ChatsComponentTemplate";
// import ChatList from "../../components/ChatListComponent";
// import { messages } from "../../mock-data/messages";
import userPicture from "../../assets/images/avatar.avif";
import moreOptions from "../../assets/images/dots.svg";
import MessageInput from "../../components/MessageInputComponent";
import { formEvents } from "../../core/formEvents";

export default class ChatsComponent extends Block {
  constructor() {
    
    const messageInput = new MessageInput({
      name: "message",
      id: "message",
      placeholder: "message",
    });
      const selectedText = window.location.pathname.startsWith("/chats/id")
        ? true
        : false;

    console.log(window.location.pathname);
    super({
      messageInput,
      userPicture,
      moreOptions,
      selectedText,

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
