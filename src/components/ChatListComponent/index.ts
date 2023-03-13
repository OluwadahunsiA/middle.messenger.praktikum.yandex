/* eslint-disable @typescript-eslint/no-explicit-any */
import Block from "../../core/Block";
import template from "./ChatListTemplate";

import UserProfileService from "../../services/userProfileService";
import ChatService from "../../services/chatService";

import { BASE_URL_RESOUCES } from "../../core/HTTP";

//@ts-ignore
import avatar from "../../assets/images/avatar.avif";

type ChatListProps = { [key: string]: string };
class ChatList extends Block {
  constructor(props: ChatListProps[] | any) {
    super({
      ...props,
      baseUrl: BASE_URL_RESOUCES,
      isUsers: false,
      users: [],
      avatar: avatar,

      events: {
        click: (event: Event) => {
          const clickedUser = event.target as Element;

          const clickedUserInfo = clickedUser.closest(
            ".chats-list__single"
          ) as HTMLElement;

          if (clickedUserInfo && clickedUserInfo.dataset) {
            const id = clickedUserInfo.dataset.userId as string;
            console.log(id);

            UserProfileService.findUserById(id);

            // const title =
            //   // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            //   clickedUser.querySelector("#chat_list-title")!.textContent;

            // console.log(title);
            // ChatService.startChating(id, title, true);
          }
        },
      },
    });
  }

  render() {
    return this.compile(template);
  }
}

export default new ChatList({});
