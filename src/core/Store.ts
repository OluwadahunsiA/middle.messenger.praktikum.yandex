import EventBus from "./EventBus";
import { set, parseInternalJSON } from "../utils/helper";

import { StoreInterface } from "../types";

class Store extends EventBus {
  appState: StoreInterface = {
    isAuth: false,
    user: null,
    emptyChat: true,
    selectedUser: null,
    currentChat: null,
    messages: {},
    chats: [],
  };

  initState() {
    localStorage.setItem("currentState", JSON.stringify(this.appState));

    this.emit("set-state", this.appState);
  }

  getState() {
    const state = localStorage.getItem("currentState");

    if (state) {
      return parseInternalJSON(state);
    } else {
      return {};
    }
  }

  removeState() {
    this.appState = {
      isAuth: false,
      user: null,
      emptyChat: true,
      selectedUser: null,
      currentChat: null,
      messages: {},
      chats: [],
    };
    localStorage.removeItem("currentState");
  }

  setState(path: string, value: unknown) {
    this.appState = this.getState();
    const updatedState = set(this.appState, path, value);

    localStorage.setItem("currentState", JSON.stringify(updatedState));

    this.emit("set-state", updatedState);
  }
}

export default new Store();
function deepParseJson(store: any) {
  throw new Error("Function not implemented.");
}
