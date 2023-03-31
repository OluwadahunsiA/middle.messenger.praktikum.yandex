/* eslint-disable import/no-named-as-default-member */
import { expect } from "chai";
import sinon from "sinon";
import Link from "./index";
import Router from "../../core/Router";

describe("Test Link component", () => {
  it("should render Link component", () => {
    new Link({ path: "/" });
  });

  it("should go to the clicked path", () => {
    const link = new Link({ path: "/" });
    const spy = sinon.spy(Router, "go");
    const element = link.element as HTMLAnchorElement;

    element.click();

    expect(spy.calledOnce).to.eq(true);
  });

  it("should return HTMLAnchorElement", () => {
    const link = new Link({ path: "/" });
    const { element } = link;

    expect(element).to.be.instanceOf(window.HTMLAnchorElement);
  });
});
