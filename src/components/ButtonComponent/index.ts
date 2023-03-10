/* eslint-disable @typescript-eslint/no-explicit-any */
import template from "./ButtonTemplate";
import Block from "../../core/Block";

export default class Button extends Block {
  constructor(props: Record<string, any>) {
    super({
      ...props,
    });
  }

  render() {
    return this.compile(template);
  }
}
