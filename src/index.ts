/* eslint-disable @typescript-eslint/no-explicit-any */
import "./styles/main.scss";
import Registration from "./pages/Registration";
import Chats from "./pages/Chat";
import UserProfile from "./pages/UserProfile";

import ChangePassword from "./pages/ChangePassword";

import Error404 from "./pages/Error404";
import Error500 from "./pages/Error500";
import Login from "./pages/Login";

import Router from "./core/Router";
import authenticationController from "./controllers/authenticationController";

const Routes = {
  Login: "/",
  Registration: "/sign-up",
  Profile: "/settings",
  Chat: "/messenger",
  Server: "/server-error",
  Password: "/settings/password",
  NotFound: "?",
};

window.addEventListener("DOMContentLoaded", () => {
  authenticationController.getUser();

  Router.use(Routes.Login, Login, { isPrivateRoute: false })
    .use(Routes.Registration, Registration, { isPrivateRoute: false })
    .use(Routes.Profile, UserProfile, { isPrivateRoute: true })
    .use(Routes.Chat, Chats, { isPrivateRoute: true })
    .use(Routes.Password, ChangePassword, { isPrivateRoute: true })
    .use(Routes.Server, Error500, { isPrivateRoute: false })
    .use(Routes.NotFound, Error404, { isPrivateRoute: false })
    .redirect("/");

  Router.start();
});
