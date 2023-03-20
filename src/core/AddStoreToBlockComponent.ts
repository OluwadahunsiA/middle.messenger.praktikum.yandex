/* eslint-disable @typescript-eslint/no-explicit-any */
import Block from "./Block";
import Store from "./Store";
import { PropsType } from "../types";

export function AddStoreToBlock(
  BlockComponent: typeof Block,
  addStateToProps: (state: any) => PropsType
) {
  return class extends BlockComponent {
    constructor(props = {}) {
      super({ ...props, ...addStateToProps(Store.getState()) });

      Store.on("set-state", () => {
        this.setProps({ ...addStateToProps(Store.getState()) });
      });
    }
  };
}
