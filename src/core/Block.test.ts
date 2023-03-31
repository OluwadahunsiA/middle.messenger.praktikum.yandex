/* eslint-disable import/no-named-as-default-member */
import { expect } from "chai";
import Block from "./Block";

describe("Test the Block class", () => {
  const handlebs = `
  <div class="test">
  <h1> {{ title }} </h1>
  </div>
  `;

  const tag = "DIV";

  const props = { title: "title" };

  class Component extends Block {
    render() {
      return this.compile(handlebs);
    }
  }

  const getComponent = () => new Component(props);

  it("should render an element", () => {
    expect(getComponent().element?.tagName).to.eq(tag);
  });

  it("should render correct props", () => {
    expect(getComponent().element?.textContent?.trim()).to.equal(props.title);
  });
});
