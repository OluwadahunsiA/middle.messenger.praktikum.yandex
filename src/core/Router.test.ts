/* eslint-disable @typescript-eslint/no-var-requires */
import Router from "./Router";
import Block from "./Block";

const { expect } = require("chai");

describe("Test Router", () => {
  class Component extends Block {
    render() {
      return this.compile("<div>Router component</div>");
    }
  }

  Router.use("/1", Component).use("/2", Component).start();

  it("should add new routes", () => {
    Router.use("/3", Component);

    expect(Router.routes.length).to.eq(3);
  });

  it("should go to a new path", () => {
    Router.go("/2");

    expect(window.location.pathname).to.eq("/2");
  });
});
