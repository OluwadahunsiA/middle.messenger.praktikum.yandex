import ChatsAPI from "../api/chats";
import Store from "../core/Store";
import MessageController from "./messageController";
import ChatListComponent from "../components/ChatListComponent";
import SearchedUsers from "../components/SearchedUsersComponent";
import { PropsType } from "../types";
import { convertDate } from "../utils/helper";
import AddUsers from "../components/AddUsers";
import DeleteUsers from "../components/DeleteUsers";
import ChatsComponent from "../components/ChatsComponent";
import GeneralController from "./generalController";

class ChatController extends GeneralController {
  constructor() {
    super();
  }

  createChat(data: XMLHttpRequestBodyInit, userId: number[]) {
    ChatsAPI.createChat(data)
      .then(async (result) => {
        if (result.status === 200) {
          const chatId = JSON.parse(result.response).id;

          const request = JSON.stringify({ users: [...userId], chatId });

          const { title } = JSON.parse(data as string);

          const chatTitle = userId.length === 1 ? title.split("and")[0] : title;

          const isGroupChat = userId.length > 2;

          this.addUsersToChat(request);

          this.startChating(chatId, chatTitle, isGroupChat);
        } else {
          const error = JSON.parse(result.responseText).reason;
          console.log(error);
        }
      })
      .then(() => this.getChats())
      .catch((error) => {
        console.log("error", error);
      });
  }

  getChats() {
    ChatsAPI.getChats()
      .then((result) => {
        if (result.status === 200) {
          const userId = Store.getState().user.id;

          const chatsData = JSON.parse(result.response);

          const chats = this.mapChats(chatsData, userId);

          ChatListComponent.setProps({
            chats,
            isChats: true,
            isUsers: false,
          });

          Store.setState("chats", chats);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  startChating(chatId: string, chatTitle: string | null, groupChat = false) {
    ChatsAPI.getChatToken(chatId)
      .then(async (result) => {
        if (result.status === 200) {
          const { token } = JSON.parse(result.responseText);
          const chatIdToNumber = Number(chatId);

          MessageController.close();

          await MessageController.connect(chatIdToNumber, token, "0");

          Store.setState("chosenUser", null);

          Store.setState("noChats", false);

          Store.setState("activeChat", {
            id: Number(chatId),
            title: chatTitle,
            avatar: null,
            groupChat,
          });
        }
      })
      .catch((error) => {
        Store.setState("noChats", true);

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
    Store.setState("noChats", true);
    Store.setState("chosenUser", null);
    Store.setState("activeChat", null);
  }

  deleteChat(data: XMLHttpRequestBodyInit) {
    ChatsAPI.deleteChat(data)
      .then(async (result) => {
        if (result.status === 200) {
          MessageController.close();

          Store.setState("chosenUser", null);

          Store.setState("activeChat", null);
        } else {
          const error = JSON.parse(result.responseText).reason;
          console.log(error);
        }
      })
      .then(() => {
        this.getChats();
      })
      .catch((error) => {
        console.log("error", error);
      });
  }

  addUsersToChat(data: XMLHttpRequestBodyInit) {
    ChatsAPI.addUserToChat(data)
      .then((result) => {
        if (result.status === 200) {
          AddUsers.setProps({
            openedPop: false,
          });
        } else {
          const error = JSON.parse(result.responseText).reason;
          console.log(error);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  deleteUsersFromChat(userId: number[]) {
    const chatId = Store.getState().activeChat.id;

    const request = JSON.stringify({ users: [...userId], chatId });

    ChatsAPI.deleteUsersFromChat(request)
      .then((result) => {
        if (result.status === 200) {
          DeleteUsers.setProps({
            openedPop: false,
          });

          if (SearchedUsers.props.users.length === 0) {
            ChatsComponent.setProps({
              isEmptyChat: true,
            });

            ChatListComponent.setProps({
              isChats: false,
            });

            this.getChats();
            Store.setState("activeChat", null);
          }
        } else {
          const error = JSON.parse(result.responseText).reason;
          console.log(error);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  getChatUsers() {
    const chatId = Store.getState().activeChat.id;

    ChatsAPI.getChatUsers(String(chatId))
      .then((result) => {
        if (result.status === 200) {
          const users = JSON.parse(result.response);

          SearchedUsers.setProps({
            isUsers: true,
            users,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  displayTitle(isCommonChat: boolean, chat: PropsType, isCreator: boolean) {
    if (isCommonChat) {
      const [first, second] = chat.title.split("and");

      const newTitle = isCreator ? first : second;

      return newTitle;
    }

    return chat.title;
  }

  mapChats(chats: PropsType, userId: number) {
    return chats.map((chat: PropsType) => {
      const isCreator = userId === chat.created_by;

      const commonChat = chat.title.includes("and");

      const title = this.displayTitle(commonChat, chat, isCreator);

      const lastMessages = chat.last_message;

      delete chat.title;

      delete chat.last_message;

      if (lastMessages) {
        const newTime = convertDate(lastMessages.time);

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

export default new ChatController();
