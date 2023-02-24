/* eslint-disable @typescript-eslint/no-explicit-any */
import renderDOM from "./core/renderDOM";
import Registration from "./pages/Registration";
import Chats from "./pages/Chats";
import UserProfile from "./pages/UserProfile";
import EditProfile from "./pages/EditProfile";
import ChangePassword from "./pages/ChangePassword";
import ChangePicture from "./pages/ChangePicture";
import Error404 from "./pages/Error404";
import Error500 from "./pages/Error500";
import Login from "./pages/Login";

const login = new Login();
const registration = new Registration();
const chats = new Chats();
const profile = new UserProfile();
const editProfile = new EditProfile();
const changePassword = new ChangePassword();
const changePicture = new ChangePicture();
const error404 = new Error404();
const error500 = new Error500();

const pageRoutes: Record<string, any> = {
  "/": login,
  "/registration": registration,
  "/chats": chats,
  "/chats/id":chats,
  "/user-profile": profile,
  "/user-profile/edit-profile": editProfile,
  "/user-profile/change-password": changePassword,
  "/user-profile/change-picture": changePicture,
  "/error404": error404,
  "/error500": error500,
};

const errorRoutes: Record<string, any> = {
  "/error404": error404,
  "/error500": error500,
};

const location =
  pageRoutes[window.location.pathname] || errorRoutes["/error404"];

renderDOM(location, "root");
