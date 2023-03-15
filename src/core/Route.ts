/* eslint-disable @typescript-eslint/no-explicit-any */
import Block from "./Block";
import renderDOM from "./renderDOM";

function isEqual(lhs: string, rhs: string) {
  return lhs === rhs;
}

export default class Route {
  protected _pathname: string;

  protected _blockClass: Block | any;

  _block: Block | null;

  _props: Record<string, any>;

  constructor(pathname: string, view: Block, props: Record<string, any>) {
    this._pathname = pathname;
    this._blockClass = view;
    this._block = null;
    this._props = props;
  }

  navigate(pathname: string) {
    if (this.match(pathname)) {
      this._pathname = pathname;
      this.render();
    }
  }

  leave() {
    if (this._block) {
    
      this._block = null;
     
    }
  }

  match(pathname: string) {
    return isEqual(pathname, this._pathname);
  }
  render() {
    this._block = new this._blockClass(this._props);
  
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    renderDOM(this._block!, "root");
  }
}
