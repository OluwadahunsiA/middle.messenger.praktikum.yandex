import Button from "../../components/ButtonComponent";
import Block from "../../core/Block";
import { formEvents } from "../../core/formEvents";
import template from "./ChangePictureTemplate";

export default class ChangePicture extends Block {
  constructor() {
    const state = {};
    const button = new Button({
      type: "submit",
      name: "Update picture",
    });

    super({
      button,
      events: {
        submit: (event: Event) => formEvents.submit(event, state),
      },
    });
  }

  render() {
    return this.compile(template);
  }
}
