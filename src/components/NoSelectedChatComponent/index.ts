import template from "./NoSelectedChatTemplate";

import Block from "../../core/Block";

export default class NoSelectedChat extends Block {
  render() {
    return this.compile(template);
  }
}
