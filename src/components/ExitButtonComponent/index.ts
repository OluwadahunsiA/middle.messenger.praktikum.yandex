import template from "./ExitButtonTemplate";
import Block from "../../core/Block";
import backIcon from "../../assets/images/back.svg";
import ChatController from "../../controllers/chatController";
import Router from "../../core/Router";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ExitButtonProps = { [key: string]: any };

export default class ExitButton extends Block {
  constructor(props: ExitButtonProps) {
    super({
      ...props,
      backIcon,
      events: {
        click: (event: Event) => {
          event.preventDefault();
          Router.go(props.path);
          ChatController.leaveChatPage();
        },
      },
    });
  }

  render() {
    return this.compile(template);
  }
}
