/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable @typescript-eslint/no-this-alias */
import template from "./MessageInputTemplate";
import Block from "../../core/Block";
import { formEvents } from "../../core/formEvents";

type InputPropsType = { [key: string]: string };

export default class MessageInput extends Block {
  constructor(props: InputPropsType) {
    super({
      ...props,
      events: {
        focus: formEvents.focus,
        blur: (event: Event) => formEvents.blur(self, event),
      },
    });

    const self = this;
  }

  render() {
    return this.compile(template);
  }
}
