import Block from "../../core/Block";
import template from "./ChatListTemplate";

//@ts-ignore
// import avatar from '../../assets/images/dots.svg'

type ChatListProps = { [key: string]: string };

export default class ChatList extends Block {
  constructor(props: ChatListProps[] | any) {
    super({
      ...props,
    });
   
  }

  render() {
    return this.compile(template);
  }
}
