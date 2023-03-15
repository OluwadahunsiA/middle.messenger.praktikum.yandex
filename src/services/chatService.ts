import ChatsAPI from "../api/chats";
import Store from "../core/Store";
import GeneralService from "./general";
import MessageService from "./messageService";

//To be completed with other components
import ChatListComponent from "../components/ChatListComponent";

import { PropsType } from "../types";
import { toDate } from "../utils/helper";
import AddUsers from "../components/AddUsers";

class ChatService extends GeneralService {
  constructor() {
    super();
  }

  createChat(data: XMLHttpRequestBodyInit, userId: number[]) {
    // this is where you can stop a loading spinner or something.

    ChatsAPI.createChat(data)
      .then(async (result) => {
        if (result.status === 200) {
          // you can show a success message here

          const chatId = JSON.parse(result.response).id;

          const request = JSON.stringify({ users: [...userId], chatId });

          const { title } = JSON.parse(data as string);

          const chatTitle =
            userId.length === 1 ? title.split("connecting...")[0] : title;

          const isGroupChat = userId.length > 2;

          this.addUsersToChat(request);

          this.startChating(chatId, chatTitle, isGroupChat);
        } else {
          const errorReason = JSON.parse(result.responseText).reason;

          /// display error message here using tooltip maybe?
        }
      })
      .then(() => this.getChats())
      .catch((error) => {
        console.log("error", error);

        // you can show error through a tooltip
      })
      .finally(() => {
        // in case you use a spinner later
      });
  }

  getChats() {
    ChatsAPI.getChats()
      .then((result) => {
        if (result.status === 200) {
          const userId = Store.getState().user.id;

          const chatsData = JSON.parse(result.response);

          const chats = this.mapChats(chatsData, userId);

          // you can load data for all your chat list here.

          ChatListComponent.setProps({
            chats,
            isChats: true,
            isUsers: false,
          });

          Store.setState("chats", chats);
        }
      })
      .catch((error) => {
        // show the tooltip for error here.

        console.log("error", error);
      });
  }

  startChating(chatId: string, chatTitle: string | null, groupChat = false) {
    ChatsAPI.getChatToken(chatId)
      .then(async (result) => {
        if (result.status === 200) {
          const { token } = JSON.parse(result.responseText);
          const chatIdToNumber = Number(chatId);

          await MessageService.connect(chatIdToNumber, token, "0");

          Store.setState("selectedUser", null);

          Store.setState("emptyChat", false);

          Store.setState("currentChat", {
            id: Number(chatId),
            title: chatTitle,
            avatar: null,
            groupChat,
          });
        }
      })
      .catch((error) => {
        Store.setState("emptyChat", true);

        console.log(error);
      });
  }

  getNewMessagesCount(chatId: number) {
    ChatsAPI.getNewMessagesCount(String(chatId));
  }

  getCommonChatWithCurrentUser(chatId: number) {
    ChatsAPI.getCommonChatWithCurrentUser(String(chatId))
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  leaveChatPage() {
    Store.setState("emptyChat", true);
    Store.setState("selectedUser", null);
    Store.setState("currentChat", null);
  }

  deleteChat(data: XMLHttpRequestBodyInit) {
    ChatsAPI.deleteChat(data)
      .then(async (result) => {
        if (result.status === 200) {
          // you can display something with a tooltip.

          //You will need to close message service here
          MessageService.close();

          Store.setState("selectedUser", null);

          Store.setState("emptyChat", true);

          Store.setState("currentChat", null);
        } else {
          const errorReason = JSON.parse(result.responseText).reason;

          //you can display a tooltip here to warn about error
        }
      })
      .then(() => {
        this.getChats();
      })
      .catch((error) => {
        // you can display a tooltip to warn about error;

        console.log("error", error);
      });
  }

  addUsersToChat(data: XMLHttpRequestBodyInit) {
    ChatsAPI.addUserToChat(data)
      .then((result) => {
        if (result.status === 200) {
          //create chat should also be closed
          AddUsers.setProps({
            openedPop: false,
          });
          // you could close pop ups here or just switch to other pages.
          // you can display a tooltip here to indicate that it was successful.
        } else {
          const errorReason = JSON.parse(result.responseText).reason;

          // you can add a tooltip to show error here.
        }
      })
      .catch((error) => {
        console.log(error);

        // you can add a tooltip to show error here.
      });
  }

  deleteUsersFromChat(userId: number[]) {
    const chatId = Store.getState().currentChat.id;

    const request = JSON.stringify({ users: [...userId], chatId });

    ChatsAPI.deleteUsersFromChat(request)
      .then((result) => {
        if (result.status === 200) {
          //you can close a popup here or return to a page.
          // you can display a tooltip here
        } else {
          const errorReason = JSON.parse(result.responseText).reason;

          // show error message;
        }
      })
      .catch((error) => {
        console.log(error);

        // you can display a tooltip here.
      });
  }

  getChatUsers() {
    const chatId = Store.getState().currentChat.id;

    ChatsAPI.getChatUsers(String(chatId))
      .then((result) => {
        if (result.status === 200) {
          const users = JSON.parse(result.response);

          // something about searching for users here.
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  displayTitle(isCommonChat: boolean, chat: PropsType, isCreator: boolean) {
    if (isCommonChat) {
      const [first, second] = chat.title.split("connecting...");

      const newTitle = isCreator ? first : second;

      return newTitle;
    }

    return chat.title;
  }

  mapChats(chats: PropsType, userId: number) {
    return chats.map((chat: PropsType) => {
      const isCreator = userId === chat.created_by;

      const commonChat = chat.title.includes("connecting...");

      const title = this.displayTitle(commonChat, chat, isCreator);

      const lastMessages = chat.last_message;

      delete chat.title;

      delete chat.last_message;

      if (lastMessages) {
        const newTime = toDate(lastMessages.time);

        lastMessages.time = newTime;

        return {
          ...chat,
          title,
          last_message: lastMessages,
        };
      }

      return {
        ...chat,
        title,
        last_message: null,
      };
    });
  }
}

export default new ChatService();
