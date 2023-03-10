import template from "../../components/UserInformationComponent/UserInformationTemplate";
import UserProfileContent from "../../components/UserProfileContent";
import ExitButton from "../../components/ExitButtonComponent";
import Block from "../../core/Block";
import { avatar } from "../../mock-data/avatar";
import { profile } from "../../mock-data/profile";

export default class UserProfile extends Block {
  constructor() {
    const exitButton = new ExitButton({
      href: "/chats",
    });
    const content = new UserProfileContent();
    const name = "person"

    super({ exitButton, avatar, name, profile, content });
  }

  render() {
    return this.compile(template);
  }
}
