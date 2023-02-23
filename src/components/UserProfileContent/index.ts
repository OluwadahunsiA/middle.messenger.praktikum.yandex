import template from "./ProfileContentTemplate";
import Block from "../../core/Block";

export default class UserProfileContent extends Block {
  constructor() {
    super();
  }

  render() {
    return this.compile(template);
  }
}
