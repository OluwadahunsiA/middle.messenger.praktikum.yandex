import template from "./LinkTemplate";
import ChatController from "../../controllers/chatController";
import Block from "../../core/Block";
import Router from "../../core/Router";


export default class Link extends Block {
  constructor(props: { [key: string]: string }) {
    super({
      ...props,
      events: {
        click: (event: Event) => {
          event.preventDefault();
          Router.go(props.path);

          if (props.path === "/messenger") {
            ChatController.leaveChatPage();
          }
        },
      },
    });
  }

  render() {
    return this.compile(template);
  }
}
