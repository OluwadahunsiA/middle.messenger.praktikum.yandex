import renderDOM from "./core/renderDOM";
import Registration from "./pages/Registration";
import Chats from "./pages/chats";

const registration = new Registration();
const chats = new Chats();

renderDOM(chats, "root");
