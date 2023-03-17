/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable @typescript-eslint/no-this-alias */
import template from "../../components/UserInformationComponent/UserInformationTemplate";
import Block from "../../core/Block";
import ExitButton from "../../components/ExitButtonComponent";
import EditProfileContent from "../../components/EditProfileContent";
import Input from "../../components/InputComponent";

import ValidateForm from "../../core/ValidateForms";
import { PropsType } from "../../types";
import UserProfileController from "../../controllers/userProfileController";

export default class ChangePassword extends Block {
  constructor() {
    const exitButton = new ExitButton({
      path: "/settings",
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
      name: "newPasswordRepeat",
      id: "repeatNewPassword",
      type: "password",
      label: "Repeat New Password",
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
      events: {
        // input: (event: Event) => formEvents.getInput(event, state),
        submit: (event: Event) => {
          event.preventDefault();

          const formElement = event.target as HTMLFormElement;
          const validateForm = ValidateForm.validateSubmit(formElement);

          const payload: PropsType = {
            oldPassword: "",
            newPassword: "",
          };

          Object.values(self.children).forEach((child) => {
            payload[child.props.name] = child.props.value;
          });

          if (validateForm) {
            UserProfileController.editPassword(
              JSON.stringify(payload),
              self.children
            );
          }
        },
      },
    });

    const self = this;
  }

  render() {
    return this.compile(template);
  }
}
