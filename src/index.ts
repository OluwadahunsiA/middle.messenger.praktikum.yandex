import renderDOM from "./core/renderDOM";
import Registration from "./pages/Registration";
import Chats from "./pages/Chats";
import UserProfile from "./pages/UserProfile";
import EditProfile from "./pages/EditProfile";
import ChangePassword from "./pages/ChangePassword";


const registration = new Registration();
const chats = new Chats();
const profile = new UserProfile();
const editProfile = new EditProfile();
const changePassword = new ChangePassword();

renderDOM(changePassword, "root");
