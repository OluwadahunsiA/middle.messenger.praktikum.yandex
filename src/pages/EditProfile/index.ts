import template from "../../components/UserInformationComponent/UserInformationTemplate";
import Block from "../../core/Block";
import ExitButton from "../../components/ExitButtonComponent";


export default class EditProfile extends Block {
  constructor() {

      const exitButton = new ExitButton({
        href: "",
      });
    super({exitButton});

  }

  render() {
    return this.compile(template);
  }
}
