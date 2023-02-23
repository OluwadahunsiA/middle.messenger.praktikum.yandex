import Block from "../../core/Block";
import template from "./ChangePictureTemplate";

export default class ChangePicture extends Block {
  constructor() {
   
    super();
  }

  render() {
    return this.compile(template);
  }
}
