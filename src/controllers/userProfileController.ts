import UserProfileAPI from "../api/userProfile";

import Store from "../core/Store";
import Block from "../core/Block";

import ChatList from "../components/ChatListComponent";

import { PropsType } from "../types";

import { BASE_URL_RESOUCES } from "../core/HTTP";
import EditablePicture from "../components/EditablePicture";

class UserProfileController {
  editProfile(data: XMLHttpRequestBodyInit) {

    UserProfileAPI.changeProfile(data)
      .then((result) => {
        if (result.status === 200) {

          Store.setState("user", JSON.parse(result.response));
        }
      })
      .catch((error) => {
       

        console.log("error", error);
      })

  }

  editAvatar(data: XMLHttpRequestBodyInit) {
    UserProfileAPI.changeAvatar(data)
      .then((result) => {
        if (result.status === 200) {
          const uploadAvatar = new EditablePicture({});
          uploadAvatar.setProps({
            avatar: BASE_URL_RESOUCES + JSON.parse(result.response).avatar,
          });
        }

        return result;
      })
      .then((result) => {
        Store.setState("user", JSON.parse(result.response));
      })
      .catch((error) => {
        console.log("error", error);
      });
  }

  editPassword(data: XMLHttpRequestBodyInit, inputs: PropsType) {
  

    UserProfileAPI.changePassword(data)
      .then((result) => {
        if (result.status === 200) {

          Object.values(inputs).forEach((element) => {
            if (element.props.value !== undefined) {
              element.setProps({ value: "", error: "" });
            }
          });
        }
      })
      .catch((error) => {

        console.log("error", error);
      })
  }

  searchUserByLogin(data: string, Component?: Block) {

    UserProfileAPI.searchUserByLogin(data)
      .then((result) => {
        if (result.status === 200) {
          const users = JSON.parse(result.response);

          const isNotFoundUser = users.length === 0;

          if (Component) {
            Component.setProps({
              isUsers: true,
              users,
              isNotFoundUser,
            });
          } else {
            ChatList.setProps({
              isUsers: true,
              isChats: false,
              users,
              isNotFoundUser,
            });
          }
        }
      })
      .catch((error) => {
        console.log("error", error);
      })
  }

  findUserById(id: string) {
    if (!id) return;

    UserProfileAPI.getUserById(id)
      .then((result) => {
        if (result.status === 200) {
          const user = JSON.parse(result.response);

          const displayName = `${user.first_name} ${user.second_name}`;

          Store.setState("noChats", false);
          Store.setState("activeChat", null);

          Store.setState("chosenUser", {
            id: user.id,
            displayName,
            avatar: user.avatar,
          });
        }
      })
      .catch((error) => {
        Store.setState("noChats", true);
        console.log("error", error);
      });
  }
}

export default new UserProfileController();
