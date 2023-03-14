/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import Block from "../../core/Block";
import template from "./ChatsComponentTemplate";
import userPicture from "../../assets/images/avatar.avif";
import moreOptions from "../../assets/images/dots.svg";
import MessageInput from "../../components/MessageInputComponent";
import { formEvents } from "../../core/formEvents";
import Button from "../ButtonComponent";
import SendMessage from "../SendMessage";
import NoSelectedChat from "../NoSelectedChatComponent";
import { PropsType, Message, StoreInterface } from "../../types";
import { BASE_URL_RESOUCES } from "../../core/HTTP";
import SelectChat from "../SelectChat";
import { AddStoreToBlock } from "../../core/AddStoreToBlockComponent";
import MessageComponent from "../Message";

class ChatsComponent extends Block {
  constructor(props: PropsType) {
    const state = {};
    const sendMessage = new SendMessage({});
    const noSelectedChat = new NoSelectedChat();
    const isEmptyChat = props?.isEmptyChat === false ? props.isEmptyChat : true;
    const selectChatWithUser = new SelectChat();

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
      ...props,
      isEmptyChat,
      messageInput,
      userPicture,
      selectChatWithUser,
      moreOptions,
      selectedText,
      button,
      sendMessage,
      noSelectedChat,
      baseUrl: BASE_URL_RESOUCES,
      currentChat: props?.currentChat,
      selectedUser: props?.selectedUser,
      messages: props?.messages,

      events: {
        input: (event: Event) => formEvents.getInput(event, state),
        submit: (event: Event) => formEvents.submit(event, state),
      },
    });

    const messages = this.createMessages(props);
    this.children = { ...this.children, messages };
  }

  componentDidUpdate(_oldProps: PropsType, newProps: PropsType): boolean {
    this.children.messsages = this.createMessages(newProps);

    return true;
  }

  createMessages(props: PropsType) {
    return props?.messages?.map(
      (messages: Message) =>
        new MessageComponent({
          content: messages.content,
          type: messages.user_id === props.userId ? "send" : "receive",
          time: messages.time,
        })
    );
  }

  render() {
    return this.compile(template);
  }
}

function addStateToProps(state: StoreInterface) {
  const { currentChat } = state;

  const { selectedUser } = state;

  console.log(
    "check state",
    "selected user",
    selectedUser,
    "current chat",
    currentChat
  );

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

  const id = state.currentChat!.id;

  return {
    isEmptyChat: false,
    selectedUser: null,
    currentChat,
    messages: ((state.messages as any) || {})[id] || [],
    userId: state.user!.id,
  };
}

export default AddStoreToBlock(ChatsComponent, addStateToProps);
