/* eslint-disable @typescript-eslint/no-var-requires */
import { convertDate, set } from "./helper";

const { expect } = require("chai");

describe("Test helper functions", () => {
  describe("Check date converter", () => {
    it("should return time in the right format", () => {
      const time = "2023-03-31T18:21:44+00:00";

      const result = convertDate(time);

      expect(result, "Mar 31, 2023, 09:21 PM");
    });
  });

  describe("check set function", () => {
    let obj: any;
    let path: any;

    beforeEach(() => {
      path = "test.test";
      obj = {};
    });

    it("should set an object value by key path", () => {
      const result = set(obj, path, 20);

      expect((result as any).test.test).to.eq(20);
    });

    it("should return the passed object if it is not an object", () => {
      obj = 20;

      const result = set(obj, "test.test", 20);

      expect(result).to.eq(obj);
    });

    it("should return null if the first argument is null", () => {
      obj = null;

      const result = set(obj, path, 20);

      expect(result).to.eq(obj);
    });

    it("should throw an error if the given path is not a string", () => {
      path = 10 as any;

      const func = () => set(obj, path, 3);

      expect(func).to.throw(Error);
    });

    it("should mutate existing object and not return a new one", () => {
      const result = set(obj, path, 3);

      expect(result).to.eq(obj);
    });
  });
});
