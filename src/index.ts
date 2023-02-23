import renderDOM from "./core/renderDOM";
import Registration from "./pages/Registration";
import Chats from "./pages/chats";
import UserProfile from "./pages/UserProfile";
import EditProfile from "./pages/EditProfile";

const registration = new Registration();
const chats = new Chats();
const profile = new UserProfile();
const editProfile = new EditProfile();

renderDOM(editProfile, "root");
