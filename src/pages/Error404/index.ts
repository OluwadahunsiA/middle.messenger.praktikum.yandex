import Block from "../../core/Block";
import template from "./Error404Template";
import Link from "../../components/Link";

export default class Error404 extends Block {
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
