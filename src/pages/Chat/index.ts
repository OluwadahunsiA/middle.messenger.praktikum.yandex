import Block from "../../core/Block";
import template from "./ChatTemplate";
import ChatList from "../../components/ChatListComponent";
import { messages } from "../../mock-data/messages";
import ChatsComponent from "../../components/ChatsComponent";
import { AddStoreToBlock } from "../../core/AddStoreToBlockComponent";
import { PropsType } from "../../types";
import ChatSearchInput from "../../components/ChatSearchInput";

class Chats extends Block {
  constructor() {
    const chatSearch = new ChatSearchInput();

    const chatsContent = new ChatsComponent();

    const chatList = ChatList;

    super({
      chatList,
      chatsContent,
      chatSearch,
    });
  }

  render() {
    return this.compile(template);
  }
}

function addStateToProps(state: PropsType) {
  if (state.chats) {
    const { chats } = state;

    return {
      chats,
    };
  }

  return {
    chats: [],
  };
}

export default AddStoreToBlock(Chats, addStateToProps);
