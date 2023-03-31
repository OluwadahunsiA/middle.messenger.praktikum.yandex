/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/named */
import sinon, {
  SinonFakeXMLHttpRequest,
  SinonFakeXMLHttpRequestStatic,
} from "sinon";
import { expect } from "chai";
import HTTP from "./HTTP";

describe("Test HTTP", () => {
  const requests: SinonFakeXMLHttpRequest[] = [];
  let xhr: SinonFakeXMLHttpRequestStatic;

  beforeEach(() => {
    xhr = sinon.useFakeXMLHttpRequest();

    // @ts-ignore
    global.XMLHttpRequest = xhr;

    xhr.onCreate = (request: SinonFakeXMLHttpRequest) => {
      requests.push(request);
    };
  });

  afterEach(() => {
    requests.length = 0;
  });

  it("should send a GET request from the get() method", () => {
    HTTP.get("/user");

    const [request] = requests;

    expect(request.method).to.eq("GET");
  });
});
