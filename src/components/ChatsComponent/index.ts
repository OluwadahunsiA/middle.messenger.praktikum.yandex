/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import Block from "../../core/Block";
import template from "./ChatsComponentTemplate";
import userPicture from "../../assets/images/avatar.avif";
import moreOptions from "../../assets/images/dots.svg";
import SendMessage from "../SendMessage";
import NoSelectedChat from "../NoSelectedChatComponent";
import { PropsType, Message, StoreInterface } from "../../types";
import { BASE_URL_RESOUCES } from "../../core/HTTP";
import SelectChat from "../SelectChat";
import { AddStoreToBlock } from "../../core/AddStoreToBlockComponent";
import MessageComponent from "../Message";
import { toDate } from "../../utils/helper";
import ChatService from "../../services/chatService";
import AddUsers from "../AddUsers";
import SearchedUsers from "../SearchedUsersComponent";
class ChatsComponent extends Block {
  constructor(props: PropsType) {
    const defaultPicture = userPicture;
    const sendMessage = new SendMessage({});
    const noSelectedChat = new NoSelectedChat();
    const isEmptyChat = props?.emptyChat === false ? props.emptyChat : true;
    const selectChatWithUser = new SelectChat();

    super({
      ...props,
      isEmptyChat,
      defaultPicture,
      selectChatWithUser,
      moreOptions,
      sendMessage,
      noSelectedChat,
      messages: props?.messages,
      baseUrl: BASE_URL_RESOUCES,
      currentChat: props.currentChat,
      selectedUser: props.selectedUser,

      events: {
        click: (event: Event) => {
          console.log(event.target);
          if ((event.target as Element).classList.contains("delete-chat")) {
            ChatService.deleteChat(
              JSON.stringify({ chatId: this.props.currentChat.id })
            );
          }

          if ((event.target as Element).classList.contains("add-user")) {
            SearchedUsers.setProps({
              users: [],
              selectedUsers: [],
            });

            AddUsers.setProps({
              openedPop: true,
            });
          }
        },
      },
    });

    const messages = this.createMessages(props);

    this.children = { ...this.children, messages };
  }

  componentDidUpdate(_: PropsType, newProps: PropsType): boolean {
    this.children.messages = this.createMessages(newProps);

    return true;
  }

  createMessages(props: PropsType) {
    return props?.messages?.map((messages: Message) => {
      return new MessageComponent({
        content: messages.content,
        type: messages.user_id === props.userId ? "send" : "receive",
        time: toDate(messages.time),
      });
    });
  }

  render() {
    return this.compile(template);
  }
}

function addStateToProps(state: StoreInterface) {
  const { currentChat } = state;

  const { selectedUser } = state;
  console.log(selectedUser );

  if (selectedUser) {
    return {
      isEmptyChat: false,
      selectedUser: state.selectedUser,
      currentChat: null,
      messages: [],
    };
  }

  if (!currentChat && !selectedUser) {
    return {
      isEmptyChat: true,
      selectedUser: null,
      currentChat: null,
      messages: null,
    };
  }

  const chatId = state.currentChat!.id;

  return {
    isEmptyChat: false,
    selectedUser: null,
    currentChat,
    messages: ((state.messages as any) || {})[chatId] || [],
    userId: state.user!.id,
  };
}

export default AddStoreToBlock(ChatsComponent, addStateToProps);
