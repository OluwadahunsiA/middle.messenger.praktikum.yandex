/* eslint-disable @typescript-eslint/no-this-alias */
/* eslint-disable @typescript-eslint/no-use-before-define */
import Block from "../../core/Block";
import template from "./LoginTemplate";
import Input from "../../components/InputComponent";
import { formEvents } from "../../core/formEvents";
import Button from "../../components/ButtonComponent";

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

    super({
      login,
      button,
      password,
      events: {
        input: (event: Event) => formEvents.getInput(event, state),
        submit: (event: Event) => formEvents.submit(event, state),
      },
    });
  }

  render() {
    return this.compile(template);
  }
}
