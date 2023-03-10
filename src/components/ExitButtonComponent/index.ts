import template from "./ExitButtonTemplate";
import Block from "../../core/Block";
import backIcon from "../../assets/images/back.svg";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ExitButtonProps = { [key: string]: any };

export default class ExitButton extends Block {
  constructor(props: ExitButtonProps) {
    super({
      backIcon,
      ...props,
    });
  }

  render() {
    return this.compile(template);
  }
}
