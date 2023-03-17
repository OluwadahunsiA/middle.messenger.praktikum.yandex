import template from "./SelectChatComponent";

import Block from "../../core/Block";

import { AddStoreToBlock } from "../../core/AddStoreToBlockComponent";

import Button from "../ButtonComponent";

import ChatController from "../../controllers/chatController";

import { BASE_URL_RESOUCES } from "../../core/HTTP";

import { PropsType, StateInterface } from "../../types";

class SelectChat extends Block {
  constructor(props: PropsType) {
    const startChatButton = new Button(
      {
        type: "",
        name: "Start Chat",
      },
      {
        click: async () => {
          await ChatController.createChat(
            JSON.stringify({
              title: `${this.props.chosenUser.displayName} and ${this.props.user.first_name} ${this.props.user.second_name}`,
            }),
            [Number(this.props.chosenUser.id)]
          );
        },
      }
    );

    super({
      ...props,
      baseUrl: BASE_URL_RESOUCES,
      startChatButton,
      chosenUser: props.chosenUser,
      user: props.user,
    });
  }

  render() {
    return this.compile(template);
  }
}

function addStateToProps(state: StateInterface) {
  return {
    chosenUser: state.chosenUser,
    user: state.user,
  };
}

export default AddStoreToBlock(SelectChat, addStateToProps);
