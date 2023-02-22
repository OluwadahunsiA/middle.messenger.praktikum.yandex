import Input from "../../components/InputComponent";
import Block from "../../core/Block";
import template from "./registrationTemplate";

export default class Registration extends Block {
  constructor() {
    // const state = {};

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

    super({ email, login, firstName, secondName, phone, password });
  }

  render() {
    return this.compile(template);
  }
}
