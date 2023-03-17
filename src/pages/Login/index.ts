/* eslint-disable @typescript-eslint/no-this-alias */
/* eslint-disable @typescript-eslint/no-use-before-define */
import Block from "../../core/Block";
import template from "./LoginTemplate";
import Input from "../../components/InputComponent";
import { formEvents } from "../../core/formEvents";
import Button from "../../components/ButtonComponent";
import Link from "../../components/Link";
import AuthenticationController from "../../controllers/authenticationController";
import ValidateForm from "../../core/ValidateForms";

export default class Login extends Block {
  constructor() {
    const state = {};

    const login = new Input({
      name: "login",
      id: "login",
      type: "login",
      label: "Login",
      placeholder: "login",
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

    const button = new Button({
      type: "submit",
      name: "Enter",
    });

    const link = new Link({
      path: "/sign-up",
      name: "Sign up",
    });

    super({
      link,
      login,
      button,
      password,
      events: {
        input: (event: Event) => formEvents.getInput(event, state),
        submit: (event: Event) => {
          // formEvents.submit(event, state);

          event.preventDefault();

          const form = event.target as HTMLFormElement;

          const validateForm = ValidateForm.validateSubmit(form);

          const payload: { [key: string]: string } = {
            email: "",
            password: "",
          };

          Object.values(self.children).forEach((element) => {
            payload[element.props.name] = element.props.value;
          });

          const dataToString = JSON.stringify(payload);

          if (validateForm) {
            AuthenticationController.signin(dataToString, self.children);
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
