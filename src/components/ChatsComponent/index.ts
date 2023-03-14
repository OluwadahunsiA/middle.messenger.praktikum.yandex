/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import Block from "../../core/Block";
import template from "./ChatsComponentTemplate";
import userPicture from "../../assets/images/avatar.avif";
import moreOptions from "../../assets/images/dots.svg";
// import MessageInput from "../../components/MessageInputComponent";
// import { formEvents } from "../../core/formEvents";
// import Button from "../ButtonComponent";
import SendMessage from "../SendMessage";
import NoSelectedChat from "../NoSelectedChatComponent";
import { PropsType, Message, StoreInterface } from "../../types";
import { BASE_URL_RESOUCES } from "../../core/HTTP";
import SelectChat from "../SelectChat";
import { AddStoreToBlock } from "../../core/AddStoreToBlockComponent";
import MessageComponent from "../Message";
import { toDate } from "../../utils/helper";

class ChatsComponent extends Block {
  constructor(props: PropsType) {
    const defaultPicture = userPicture;
    const sendMessage = new SendMessage({});
    const noSelectedChat = new NoSelectedChat();
    const isEmptyChat = props?.isEmptyChat === false ? props.isEmptyChat : true;
    const selectChatWithUser = new SelectChat();

    super({
      ...props,
      isEmptyChat,
      defaultPicture,
      selectChatWithUser,
      moreOptions,
      sendMessage,
      noSelectedChat,
      baseUrl: BASE_URL_RESOUCES,
      currentChat: props?.currentChat,
      selectedUser: props?.selectedUser,
      messages: props?.messages,
    });

    const messages = this.createMessages(props);

    console.log(messages);

    this.children = { ...this.children, messages };
  }

  componentDidUpdate(_: PropsType, newProps: PropsType): boolean {
    this.children.messsages = this.createMessages(newProps);

    console.log(this.children.messages);

    return true;
  }

  createMessages(props: PropsType) {
    return props?.messages?.map((messages: Message) => {
      console.log(messages.user_id, props.userId);

      new MessageComponent({
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
