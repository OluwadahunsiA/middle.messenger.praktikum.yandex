import Block from "../../core/Block";
import template from "./Error404Template";

export default class Error404 extends Block {
  constructor() {
    super();
  }

  render(){
    return this.compile(template);
  }
}
