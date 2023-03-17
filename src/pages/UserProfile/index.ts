import template from "./UserProfileTemplate";
import ExitButton from "../../components/ExitButtonComponent";
import Button from "../../components/ButtonComponent";
import Block from "../../core/Block";
import Input from "../../components/InputComponent";
import { avatar as mockPicture } from "../../mock-data/avatar";
// import { profile } from "../../mock-data/profile";
import { PropsType } from "../../types";
import AuthenticationController from "../../controllers/authenticationController";
import Link from "../../components/Link";
import ValidateForm from "../../core/ValidateForms";
import UserProfileController from "../../controllers/userProfileController";
import { AddStoreToBlock } from "../../core/AddStoreToBlockComponent";
import EditablePicture from "../../components/EditablePicture";
import { BASE_URL_RESOUCES } from "../../core/HTTP";

class UserProfile extends Block {
  constructor(props: PropsType) {
    const defaultPicture = mockPicture[0].avatar;
    const userPicture = new EditablePicture({
      avatar: props.avatar ? BASE_URL_RESOUCES + props.avatar : defaultPicture,
    });

    const exitButton = new ExitButton({
      path: "/messenger",
    });

    const email = new Input({
      label: "Email",
      id: "email",
      name: "email",
      type: "email",
      value: props.email,
      error: "",
    });
    const login = new Input({
      label: "Login",
      id: "login",
      name: "login",
      type: "text",
      value: props.login,
      error: "",
    });
    const firstName = new Input({
      label: "First Name",
      id: "firstName",
      name: "first_name",
      type: "text",
      value: props.first_name,
      error: "",
    });
    const secondName = new Input({
      label: "Second Name",
      id: "secondName",
      name: "second_name",
      type: "text",
      value: props.second_name,
      error: "",
    });
    const phone = new Input({
      label: "Phone",
      id: "phone",
      name: "phone",
      type: "tel",
      value: props.phone,
      error: "",
    });
    const button = new Button({
      type: "",
      name: "save",
    });

    const logout = new Button(
      {
        type: "",
        name: "logout",
      },
      {
        click: (event: Event) => {
          event.preventDefault();
          AuthenticationController.logout();
        },
      }
    );

    const linkToPassword = new Link({
      name: "Change Password",
      path: "/settings/password",
    });

    super({
      ...props,
      name: props.display_name,
      exitButton,
      email,
      login,
      firstName,
      secondName,
      phone,
      button,
      linkToPassword,
      logout,
      userPicture,

      events: {
        submit: (event: Event) => {
          event.preventDefault();

          const form = event.target as HTMLFormElement;

          const validateInputs = ValidateForm.validateSubmit(form);

          const payload: PropsType = {
            first_name: "",
            second_name: "",
            display_name: "",
            login: "",
            email: "",
            password: "",
            phone: "",
          };

          Object.values(this.children).forEach((element) => {
            payload[element.props.name] = String(element.props.value);
          });

          if (validateInputs) {
            UserProfileController.editProfile(JSON.stringify(payload));
          }
        },
      },
    });
  }

  render() {
    return this.compile(template);
  }
}

function addStateToProps(state: PropsType) {
  const { user } = state;
  if (user) {
    return {
      login: user.login,
      email: user.email,
      first_name: user.first_name,
      second_name: user.second_name,
      display_name: `${user.first_name} ${user.second_name} `,
      phone: user.phone,
      avatar: user.avatar,
    };
  } else {
    return {
      login: null,
      email: null,
      first_name: null,
      second_name: null,
      display_name: null,
      phone: null,
      avatar: null,
    };
  }
}

export default AddStoreToBlock(UserProfile, addStateToProps);
