import Block from "../../core/Block";
import template from "./ChatTemplate";
import ChatList from "../../components/ChatListComponent";
import { messages } from "../../mock-data/messages";
import ChatsComponent from "../../components/ChatsComponent";

export default class Chats extends Block {
  constructor() {
    const chatList = new ChatList({ messages });
  

    const chatsContent = new ChatsComponent();
    super({
      chatsContent,
      chatList,
    });
  }

  render() {
    return this.compile(template);
  }
}
