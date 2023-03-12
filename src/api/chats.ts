import http from "../core/HTTP";

class ChatsAPI {
  getChats() {
    return http.get("chats");
  }

  createChat(data: XMLHttpRequestBodyInit) {
    return http.post("chats", {
      headers: { "Content-Type": "application/json" },
      data,
    });
  }

  deleteChat(data: XMLHttpRequestBodyInit) {
    return http.delete("chats", {
      headers: { "Content-Type": "application/json" },
      data,
    });
  }

  getCommonChatWithCurrentUser(id: string) {
    return http.get(`chats/${id}/common`);
  }

  getChatUsers(id: string) {
    return http.get(`chats/${id}/users`);
  }

  getNewMessagesCount(id: string) {
    return http.get(`chats/new/${id}`, {
      headers: { "Content-Type": "application/json" },
    });
  }

  addUserToChat(data: XMLHttpRequestBodyInit) {
    return http.put("chats/users", {
      headers: { "Content-Type": "application/json" },
      data,
    });
  }

  deleteUsersFromChat(data: XMLHttpRequestBodyInit) {
    return http.delete("chats/users", {
      headers: { "Content-Type": "application/json" },
      data,
    });
  }
  getChatToken(id: string) {
    return http.post(`chats/token/${id}`, {
      headers: { "Content-Type": "application/json" },
    });
  }
}

export default new ChatsAPI();
