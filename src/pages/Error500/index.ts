import Link from "../../components/Link";
import Block from "../../core/Block";
import template from "./Error500Template";

export default class Error500 extends Block {
  constructor() {
    const link = new Link({
      path: "/messenger",
      name: "please go back to chats",
    });
    super({
      link,
    });
  }

  render() {
    return this.compile(template);
  }
}
