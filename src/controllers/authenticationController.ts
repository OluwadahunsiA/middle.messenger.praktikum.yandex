import Authentication from "../api/authentication";

import Store from "../core/Store";

import ChatController from "./chatController";
import MessageController from "./messageController";
import GeneralController from "./generalController";

import { PropsType } from "../types";

class AuthenticationController extends GeneralController {
  constructor() {
    super();
  }

  signup(data: XMLHttpRequestBodyInit, inputs: PropsType) {
    // you can toggle a spinner here.

    Authentication.signup(data)
      .then((result) => {
        if (result.status === 200) {
          const successResponse = JSON.parse(result.responseText).id;
          console.log(successResponse);

          // this can show a successful login.

          this.clearInput(inputs);

          this.redirect("/messenger", 1000);
        } else {
          const errorReason = JSON.parse(result.responseText).reason;

          //you can display the error here.

          if (errorReason === "User already in system") {
            this.redirect("/messenger", 1000);
          }
        }
      })
      .then(() => {
        this.getUser();
      })
      .catch((error) => {
        // you can display an error message here.

        console.log("error", error);
      })
      .finally(() => {
        //you can toggle here
      });
  }

  signin(data: XMLHttpRequestBodyInit, inputs: PropsType) {
    //you can toggle a spinner here.

    Authentication.signin(data)
      .then((result) => {
        if (result.status === 200) {
          //you can display a message here.

          this.clearInput(inputs);

          this.redirect("/messenger", 1000);
        } else {
          const errorReason = JSON.parse(result.responseText).reason;

          //you can display an error here.

          if (errorReason === "User already in system") {
            this.redirect("/messenger", 1000);
          }
        }
      })
      .then(() => {
        this.getUser();
      })
      .catch((error) => {
        //you can show a message here.

        console.log("error", error);
      })
      .finally(() => {
        // a spinner here
      });
  }

  getUser() {
    Authentication.user()
      .then((data: XMLHttpRequest) => {
        if (data.status === 200) {
          const userData = JSON.parse(data.response);

          Store.initState();

          Store.setState("user", userData);

          Store.setState("isAuth", true);

          ChatController.getChats();
        } else {
          const { isAuth } = Store.getState();

          const errorReason = JSON.parse(data.responseText).reason;

          if (isAuth) {
            //you can display a tooltip here.
          }

          Store.initState();
        }
      })
      .catch((error) => {
        // this is an error message;

        console.log("error", error);
      });
  }

  logout() {
    Authentication.logout()
      .then(() => {
        this.redirect("/", 0);

        MessageController.close();

        Store.removeState();
      })
      .catch((error) => {
        //display a tooltip

        console.log("error", error);
      });
  }
}

export default new AuthenticationController();
