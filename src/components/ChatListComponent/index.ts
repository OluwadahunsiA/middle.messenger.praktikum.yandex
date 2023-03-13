/* eslint-disable @typescript-eslint/no-explicit-any */
import Block from "../../core/Block";
import template from "./ChatListTemplate";

import userProfileService from "../../services/userProfileService";
import ChatService from "../../services/chatService";

import { BASE_URL_RESOUCES } from "../../core/HTTP";

//@ts-ignore
import avatar from "../../assets/images/dots.svg";

type ChatListProps = { [key: string]: string };

export default class ChatList extends Block {
  constructor(props: ChatListProps[] | any) {
    super({
      ...props,
      baseUrl: BASE_URL_RESOUCES,
      isUsers: false,
      users: [],
      avatar: avatar,

      events: {
        click: (event: Event) => {
          const clickedList = event.target as Element;

          const clickedUser = clickedList.closest(
            "#chat_list_click"
          ) as HTMLElement;

          if (clickedUser && clickedUser.dataset) {
            const id = clickedUser.dataset.chatId as string;

            const title =
              // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
              clickedUser.querySelector("#chat_list-title")!.textContent;
            ChatService.startChating(id, title, true);
          }
        },
      },
    });
  }

  render() {
    return this.compile(template);
  }
}
