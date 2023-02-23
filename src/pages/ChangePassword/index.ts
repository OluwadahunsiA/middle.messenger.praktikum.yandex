import template from "../../components/UserInformationComponent/UserInformationTemplate";
import Block from "../../core/Block";
import ExitButton from "../../components/ExitButtonComponent";
import EditProfileContent from "../../components/EditProfileContent";
import Input from "../../components/InputComponent";


export default class ChangePassword extends Block {
  constructor() {
    const exitButton = new ExitButton({
      href: "",
    });

    const content = new EditProfileContent();

    const oldPassword = new Input({
      name: "oldPassword",
      id: "oldPassword",
      type: "password",
      label: "Old Password",
      placeholder: "old password",
      value: "",
      error: "",
    });
    const newPassword = new Input({
      name: "newPassword",
      id: "newPassword",
      type: "password",
      label: "New Password",
      placeholder: "new password",
      value: "",
      error: "",
    });
    const repeatNewPassword = new Input({
      name: "newPassword",
      id: "repeatNewPassword",
      type: "password",
      label: "New Password",
      placeholder: "new password",
      value: "",
      error: "",
    });


    const changePassword = true;

    super({
      exitButton,
      content,
      oldPassword,
      newPassword,
      repeatNewPassword,
      changePassword,
    });
  }

  render() {
    return this.compile(template);
  }
}
