import Block from "../../core/Block";
import template from "./LoginTemplate";
import Input from "../../components/InputComponent";

export default class Login extends Block {
  constructor() {
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
    super({ login, password });
  }

  render() {
    return this.compile(template);
  }
}
