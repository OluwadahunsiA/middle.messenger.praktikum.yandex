/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import Block from "../../core/Block";
import template from "./ChatsComponentTemplate";
import userPicture from "../../assets/images/avatar.avif";
import moreOptions from "../../assets/images/dots.svg";
import SendMessage from "../SendMessage";
import NoSelectedChat from "../NoSelectedChatComponent";
import { PropsType, Message, StateInterface } from "../../types";
import { BASE_URL_RESOUCES } from "../../core/HTTP";
import SelectChat from "../SelectChat";
import { AddStoreToBlock } from "../../core/AddStoreToBlockComponent";
import MessageComponent from "../Message";
import { convertDate } from "../../utils/helper";
import ChatController from "../../controllers/chatController";
import AddUsers from "../AddUsers";
import SearchedUsers from "../SearchedUsersComponent";
import DeleteUsers from "../DeleteUsers";
class ChatsComponent extends Block {
  constructor(props: PropsType) {
    const defaultPicture = userPicture;
    const sendMessage = new SendMessage({});
    const noSelectedChat = new NoSelectedChat();
    const isEmptyChat = props?.noChats === false ? props.noChats : true;
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
      activeChat: props.activeChat,
      chosenUser: props.chosenUser,

      events: {
        click: (event: Event) => {
          if ((event.target as Element).classList.contains("delete-chat")) {
            ChatController.deleteChat(
              JSON.stringify({ chatId: this.props.activeChat.id })
            );
          }

          if ((event.target as Element).classList.contains("delete-user")) {
            SearchedUsers.setProps({
              users: [],
              selectedUsers: [],
            });

            ChatController.getChatUsers();

            DeleteUsers.setProps({
              openedPop: true,
            });
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
          if (
            (event.target as Element).classList.contains(
              "messages__display-content"
            )
          ) {
            AddUsers.setProps({
              openedPop: false,
            });
            DeleteUsers.setProps({
              openedPop: false,
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
        time: convertDate(messages.time),
      });
    });
  }

  render() {
    return this.compile(template);
  }
}

function addStateToProps(state: StateInterface) {
  const { activeChat } = state;

  const { chosenUser } = state;

  if (chosenUser) {
    return {
      isEmptyChat: false,
      chosenUser: state.chosenUser,
      activeChat: null,
      messages: [],
    };
  }

  if (!activeChat && !chosenUser) {
    return {
      isEmptyChat: true,
      chosenUser: null,
      activeChat: null,
      messages: [],
    };
  }

  const chatId = state.activeChat!.id;

  return {
    isEmptyChat: false,
    chosenUser: null,
    activeChat,
    messages: ((state.messages as any) || {})[chatId] || [],
    userId: state.user!.id,
  };
}

const chatsContent = AddStoreToBlock(ChatsComponent, addStateToProps);

export default new chatsContent();
