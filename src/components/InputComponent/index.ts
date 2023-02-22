import template from "./InputTemplate";
import Block from "../../core/Block";

type InputPropsType = { [key: string]: string };

export default class Input extends Block {
  constructor(props: InputPropsType) {
    super({
      ...props,
    });
  }

  render() {
    return this.compile(template);
  }
}
