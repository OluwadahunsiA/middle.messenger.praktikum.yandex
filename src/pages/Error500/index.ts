import Block from "../../core/Block";
import template from "./Error500Template";

export default class Error500 extends Block {
  constructor() {
    super();
  }

  render() {
    return this.compile(template);
  }
}
