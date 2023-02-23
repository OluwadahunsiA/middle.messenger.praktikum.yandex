import renderDOM from "./core/renderDOM";
import Registration from "./pages/Registration";
import Chats from "./pages/Chats";
import UserProfile from "./pages/UserProfile";
import EditProfile from "./pages/EditProfile";
import ChangePassword from "./pages/ChangePassword";
import ChangePicture from './pages/ChangePicture'
import Error404 from './pages/Error404';
import Error500 from './pages/Error500';
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

renderDOM(login, "root");
