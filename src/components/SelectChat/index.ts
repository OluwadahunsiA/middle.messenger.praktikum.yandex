import template from "./SelectChatComponent";

import Block from "../../core/Block";

import { AddStoreToBlock } from "../../core/AddStoreToBlockComponent";

import Button from "../ButtonComponent";

import ChatService from "../../services/chatService";

import { BASE_URL_RESOUCES } from "../../core/HTTP";

import { PropsType, StoreInterface } from "../../types";

class SelectChat extends Block {
  constructor(props: PropsType) {
    const startChatButton = new Button(
      {
        type: "",
        name: "Start Chat",
      },
      {
        click: async () => {
          await ChatService.createChat(
            JSON.stringify({
              title: `${this.props.selectedUser.display_name} connecting... ${this.props.user.first_name} ${this.props.user.second_name}`,
            }),
            [Number(this.props.selectedUser.id)]
          );
        },
      }
    );

    super({
      ...props,
      baseUrl: BASE_URL_RESOUCES,
      startChatButton,
      selectedUser: props.selectedUser,
      user: props.user,
    });
  }

  render() {
    return this.compile(template);
  }
}

function addStateToProps(state: StoreInterface) {
  return {
    selectedUser: state.selectedUser,
    user: state.user,
  };
}

export default AddStoreToBlock(SelectChat, addStateToProps);
