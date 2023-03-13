import Block from "../../core/Block";
import template from "./ChatSearchInputTemplate";
import UserProfileService from "../../services/userProfileService";
import Button from "../ButtonComponent";

export default class ChatSearchInput extends Block {
  constructor(props = {}) {
    const searchButton = new Button({
      type: "",
      name: "new",
    });
    super({
      ...props,
      searchButton,
      events: {
        input: (event: Event) => {
          const element = event.target as HTMLInputElement;
          
          const searchedLogin = element.value;

          UserProfileService.searchUserByLogin(
            JSON.stringify({ login: searchedLogin })
          );
        },
      },
    });
  }

  render() {
    return this.compile(template);
  }
}
