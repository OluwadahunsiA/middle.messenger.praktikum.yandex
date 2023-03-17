import template from "./LinkTemplate";
import ChatController from "../../controllers/chatController";

import Block from "../../core/Block";
import Router from "../../core/Router";
import Store from "../../core/Store";

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

          if (
            !Store.getState().isAuth &&
            Router.getRoute(window.location.pathname)?._props.isPrivateRoute
          ) {
            Router.redirect("/");
          }
        },
      },
    });
  }

  render() {
    return this.compile(template);
  }
}
