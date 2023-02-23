import Block from "../../core/Block";
import template from "./chatsTemplate";
import ChatList from "../../components/ChatListComponent";
import { messages } from "../../mock-data/messages";
import userPicture from "../../assets/images/avatar.avif";
import moreOptions from "../../assets/images/dots.svg";

export default class Chats extends Block {
  constructor() {
    const chatList = new ChatList({ messages });
    super({ userPicture, moreOptions, chatList });
  }

  render() {
    return this.compile(template);
  }
}
