import Router from "../core/Router";


import { PropsType } from "../types";

export default class GeneralController {


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
