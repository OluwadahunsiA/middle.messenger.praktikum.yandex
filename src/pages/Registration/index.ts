/* eslint-disable @typescript-eslint/no-use-before-define */
import Button from "../../components/ButtonComponent";
import Input from "../../components/InputComponent";
import Block from "../../core/Block";
import { formEvents } from "../../core/formEvents";
import template from "./registrationTemplate";
import Link from "../../components/Link";
import ValidateForm from "../../core/ValidateForms";
import AuthenticationController from "../../controllers/authenticationController";

export default class Registration extends Block {
  constructor() {
    const state = {};

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
    const password = new Input({
      name: "password",
      id: "password",
      type: "password",
      label: "Password",
      placeholder: "password",
      value: "",
      error: "",
    });
    const repeatPassword = new Input({
      name: "password",
      id: "repeatPassword",
      type: "password",
      label: "Repeat password",
      placeholder: "password",
      value: "",
      error: "",
    });

    const button = new Button({
      type: "submit",
      name: "Create account",
    });

    const link = new Link({
      path: "/",
      name: "Sign In",
    });

    super({
      link,
      email,
      login,
      firstName,
      secondName,
      phone,
      password,
      repeatPassword,
      button,
      events: {
        input: (event: Event) => formEvents.getInput(event, state),
        submit: (event: Event) => {
          event.preventDefault();

          const form = event.target as HTMLFormElement;

          const validateForm = ValidateForm.validateSubmit(form);

          const payload: { [key: string]: string } = {
            first_name: "",
            second_name: "",
            login: "",
            email: "",
            password: "",
            phone: "",
          };

          Object.values(self.children).forEach((element) => {
            payload[element.props.name] = element.props.value;
          });

          const dataToString = JSON.stringify(payload);

          if (validateForm) {
            AuthenticationController.signup(dataToString, self.children);
          }
        },
      },
    });

    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const self = this;
  }

  render() {
    return this.compile(template);
  }
}
