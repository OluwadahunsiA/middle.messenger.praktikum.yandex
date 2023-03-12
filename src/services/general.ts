import Router from "../core/Router";

//check if you need tooltip and maybe spinner.

import { PropsType } from "../types";

export default class GeneralService {
  //you might need a spinner later.

  redirect(pathname: string, time: number) {
    setTimeout(() => Router.go(pathname), time);
  }

  clearInput(data: PropsType) {
    Object.values(data).forEach((element) => {
      if (element.props.value !== undefined) {
        element.setProps({ value: "", error: "" });
      }
    });
  }
}
