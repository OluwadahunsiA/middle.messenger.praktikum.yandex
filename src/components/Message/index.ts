import template from "./MessageTemplate";
import Block from "../../core/Block";

export default class MessageComponent extends Block {
  constructor(props: { [key: string]: string }) {
    super({
      ...props,
    });
  }

  render() {
    return this.compile(template);
  }
}
