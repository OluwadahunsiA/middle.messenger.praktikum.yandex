import UserProfileAPI from "../api/userProfile";

import Store from "../core/Store";
import Block from "../core/Block";

// pictures might go here
//chat list might go here

// tooltip might go here

import { PropsType } from "../types";

import { BASE_URL_RESOUCES } from "../core/HTTP";

class UserProfileService {
  editProfile(data: XMLHttpRequestBodyInit) {
    // you can add a spinner here

    UserProfileAPI.changeProfile(data)
      .then((result) => {
        if (result.status === 200) {
          // you can show a message here

          Store.setState("user", JSON.parse(result.response));
        } else {
          // you can show a message here
        }
      })
      .catch((error) => {
        //you can show a message here;

        console.log("error", error);
      })
      .finally(() => {
        // you can show a spinner here
      });
  }

  editAvatar(data: XMLHttpRequestBodyInit) {
    // you can show a spinner here;

    UserProfileAPI.changeAvatar(data)
      .then((result) => {
        if (result.status === 200) {
          // show a success message;
          // a block component for pictures.
        } else {
          // you can show a message here
        }

        return result;
      })
      .then((result) => {
        Store.setState("user", JSON.parse(result.response));
      })
      .catch((error) => {
        // set error here

        console.log("error", error);
      })
      .finally(() => {
        //show a spinner
      });
  }

  editPassword(data: XMLHttpRequestBodyInit, inputs: PropsType) {
    //show spinner

    UserProfileAPI.changePassword(data)
      .then((result) => {
        if (result.status === 200) {
          //show the tooltip here.

          Object.values(inputs).forEach((element) => {
            if (element.props.value !== undefined) {
              element.setProps({ value: "", error: "" });
            }
          });
        } else {
          //show error
        }
      })
      .catch((error) => {
        //show error

        console.log("error", error);
      })
      .finally(() => {
        //set spinner here.
      });
  }

  searchUserByLogin(data: string, Component?: Block) {
    // you can show a spinner here;

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
            //set the chatlist props here.
          }
        } else {
          //display error message
        }
      })
      .catch((error) => {
        //show error
        console.log("error", error);
      })
      .finally(() => {
        //show spinner or something.
      });
  }

  findUserById(id: string) {
    //show spinner

    UserProfileAPI.getUserById(id)
      .then((result) => {
        if (result.status === 200) {
          const user = JSON.parse(result.response);

          const displayName = `${user.first_name} ${user.second_name}`;

          Store.setState("emptyChat", false);
          Store.setState("currentChat", null);

          Store.setState("selectedUser", {
            id: user.id,
            displayName,
            avatar: user.avatar,
          });
        } else {
          // you can show error message
        }
      })
      .catch((error) => {
        //add tooltips here

        Store.setState("emptyChat", true);
        console.log("error", error);
      })
      .finally(() => {
        //show spinner
      });
  }
}

export default new UserProfileService();
