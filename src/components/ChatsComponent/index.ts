import Block from "../../core/Block";
import template from "./ChatsComponentTemplate";
import userPicture from "../../assets/images/avatar.avif";
import moreOptions from "../../assets/images/dots.svg";
import MessageInput from "../../components/MessageInputComponent";
import { formEvents } from "../../core/formEvents";
import Button from "../ButtonComponent";

export default class ChatsComponent extends Block {
  constructor() {

    const state = {};
    
    const messageInput = new MessageInput({
      name: "message",
      id: "message",
      placeholder: "message",
    });
      const selectedText = window.location.pathname.startsWith("/chats/id")
        ? true
        : false;
    const button = new Button({
      type: "submit",
      name: "send",
    });
    
    super({
      messageInput,
      userPicture,
      moreOptions,
      selectedText,
      button,

      events: {
        input: (event: Event) => formEvents.getInput(event, state),
        submit: (event: Event) => formEvents.submit(event, state),
      },
    });

    
  }

  render() {
    return this.compile(template);
  }
}
