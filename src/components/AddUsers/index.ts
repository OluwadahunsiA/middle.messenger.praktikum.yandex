/* eslint-disable @typescript-eslint/no-non-null-assertion */
import template from "./AddUsersTemplate";

import Block from "../../core/Block";
import Store from "../../core/Store";

import Input from "../InputComponent";

import Button from "../ButtonComponent";

import UserProfileService from "../../services/userProfileService";
import ChatService from "../../services/chatService";
import SearchedUsers from "../SearchedUsersComponent";

import { PropsType } from "../../types";

class AddUser extends Block {
  constructor(props: PropsType) {
    const searchInput = new Input({
      id: "search",
      name: "search",
      type: "text",
      placeholder: "search",
      value: "",
    });

    const button = new Button({
      type: "submit",
      name: "Add User",
    });

    super({
      ...props,
      searchInput,
      button,
      openedPop: false,
      SearchedUsers,
      events: {
        click: (event: Event) => {
          if ((event.target! as Element).classList.contains("opened")) {
            this.setProps({ openedPop: false });
          }
        },
        input: (event: Event) => {
          if ((event.target! as Element).id === "search") {
            const element = event.target as HTMLInputElement;

            const { value } = element;

            UserProfileService.searchUserByLogin(
              JSON.stringify({ login: value }),
              SearchedUsers
            );
          }
        },
        submit: (event: Event) => {
          event.preventDefault();
          console.log(Store.getState());

          const chatId = Store.getState().currentChat.id;

          console.log(SearchedUsers.props);

          const selectedUserId = SearchedUsers.props.selectedUsers.map(
            (select: PropsType) => select.id
          );

          const request = JSON.stringify({
            users: [...selectedUserId],
            chatId,
          });

          ChatService.addUsersToChat(request);
          //create chat should also be closed in chatService
        },
      },
    });
  }

  render() {

    return this.compile(template);
  }
}

export default new AddUser({});
