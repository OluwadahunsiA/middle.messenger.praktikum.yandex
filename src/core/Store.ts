import EventBus from "./EventBus";
import { set } from "../utils/helper";

import { StateType } from "../types";

class Store extends EventBus {
  appState: StateType = {
    isAuthenticated: false,
  };

  initState() {
    localStorage.setItem("currentState", JSON.stringify(this.appState));

    this.emit("set-state", this.appState);
  }

  getState() {
    const state = localStorage.getItem("currentState");
    if (state) {
      //check why deep parse should work here if there is any issue..
      console.log(JSON.parse(state));
      return JSON.parse(state);
    } else {
      return {};
    }
  }

  removeState() {
    this.appState = {
      isAuthenticated: false,
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
