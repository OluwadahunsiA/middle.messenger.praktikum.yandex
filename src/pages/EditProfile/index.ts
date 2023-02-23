import template from "../../components/UserInformationComponent/UserInformationTemplate";
import Block from "../../core/Block";
import ExitButton from "../../components/ExitButtonComponent";
import EditProfileContent from "../../components/EditProfileContent";
import Input from "../../components/InputComponent";
import { avatar } from "../../mock-data/avatar";


export default class EditProfile extends Block {
  constructor() {
    const exitButton = new ExitButton({
      href: "",
    });

    const content = new EditProfileContent();

        const email = new Input({
          name: "email",
          id: "email",
          type: "email",
          label: "Email",
          placeholder: "email",
          value: "",
          error: "",
        });
        const login = new Input({
          name: "login",
          id: "login",
          type: "login",
          label: "Login",
          placeholder: "login",
          value: "",
          error: "",
        });
        const firstName = new Input({
          name: "first_name",
          id: "first_name",
          type: "first_name",
          label: "First Name",
          placeholder: "first name",
          value: "",
          error: "",
        });
        const secondName = new Input({
          name: "second_name",
          id: "second_name",
          type: "second_name",
          label: "Second Name",
          placeholder: "second name",
          value: "",
          error: "",
        });
        const phone = new Input({
          name: "phone",
          id: "phone",
          type: "phone",
          label: "Phone",
          placeholder: "phone",
          value: "",
          error: "",
        });

    super({ exitButton, content , email, login, firstName, secondName, phone, avatar});
  }

  render() {
    return this.compile(template);
  }
}
