import Block from "../../core/Block";
import template from "./ChatTemplate";
import ChatList from "../../components/ChatListComponent";
import ChatsComponent from "../../components/ChatsComponent";
import { AddStoreToBlock } from "../../core/AddStoreToBlockComponent";
import { PropsType } from "../../types";
import ChatSearchInput from "../../components/ChatSearchInput";
import Link from "../../components/Link";
import Store from "../../core/Store";
import AddUsers from "../../components/AddUsers";

class Chats extends Block {
  constructor() {
    Store.setState("currentChat", null);

    const link = new Link({
      path: "/settings",
      name: "Profile >",
    });
    const chatSearch = new ChatSearchInput();

    const chatsContent = new ChatsComponent();

    const chatList = ChatList;

    super({
      link,
      chatList,
      chatsContent,
      chatSearch,
      AddUsers,
    });
  }

  render() {
    return this.compile(template);
  }
}

// export default Chats

function addStateToProps(state: PropsType) {
  if (state.chats) {
    const { chats } = state;

    return {
      chats,
    };
  } else {
    return {
      chats: [],
    };
  }
}

export default AddStoreToBlock(Chats, addStateToProps);
