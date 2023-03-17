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

    Authentication.signup(data)
      .then((result) => {
        if (result.status === 200) {
          const successResponse = JSON.parse(result.responseText).id;
          console.log(successResponse);


          this.clearInput(inputs);

          this.redirect("/messenger", 1000);
        } else {
          const errorReason = JSON.parse(result.responseText).reason;


          if (errorReason === "User already in system") {
            this.redirect("/messenger", 1000);
          }
        }
      })
      .then(() => {
        this.getUser();
      })
      .catch((error) => {
   

        console.log("error", error);
      })
     
  }

  signin(data: XMLHttpRequestBodyInit, inputs: PropsType) {
    

    Authentication.signin(data)
      .then((result) => {
        if (result.status === 200) {
        

          this.clearInput(inputs);

          this.redirect("/messenger", 1000);
        } else {
          const errorReason = JSON.parse(result.responseText).reason;

     

          if (errorReason === "User already in system") {
            this.redirect("/messenger", 1000);
          }
        }
      })
      .then(() => {
        this.getUser();
      })
      .catch((error) => {
      

        console.log("error", error);
      })
     
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

          Store.initState();
        }
      })
      .catch((error) => {

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


        console.log("error", error);
      });
  }
}

export default new AuthenticationController();
