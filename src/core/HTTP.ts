/* eslint-disable @typescript-eslint/no-explicit-any */
import { PropsType } from "../types";

const BASE_URL = "https://ya-praktikum.tech/api/v2/";
export const BASE_URL_RESOUCES = "https://ya-praktikum.tech/api/v2/resources";
export const WWS_URL = "wss://ya-praktikum.tech/ws/chats";

enum METHOD {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
}

type RequestOptions = {
  method: METHOD;
  data?: PropsType | XMLHttpRequestBodyInit;
  headers?: Record<string, string>;
};

type HTTPMethodType = (
  url: string,
  options?: Omit<RequestOptions, "method">
) => Promise<XMLHttpRequest>;

function queryStringify(data: Record<string, any>) {
  if (typeof data !== "object") {
    throw new Error("Body must be an object");
  }

  const keys = Object.keys(data);

  return keys.reduce(
    (result, key, index) =>
      `${result}${key}=${data[key]}${index < keys.length - 1 ? "&" : ""}`,
    "?"
  );
}

class HTTP {
  get: HTTPMethodType = (url, options = {}) => {
    if (options?.data) {
      url = `${url}${queryStringify(options.data as PropsType)}`;
    }

    return this.request(url, { ...options, method: METHOD.GET });
  };

  post: HTTPMethodType = (url, options = {}) =>
    this.request(url, { ...options, method: METHOD.POST });

  put: HTTPMethodType = (url, options = {}) =>
    this.request(url, { ...options, method: METHOD.PUT });

  delete: HTTPMethodType = (url, options = {}) =>
    this.request(url, { ...options, method: METHOD.DELETE });

  private request(
    url: string,
    options: RequestOptions = { method: METHOD.GET }
  ): Promise<XMLHttpRequest> {
    const { headers = {}, method, data } = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.withCredentials = true;

      url = BASE_URL + url;

      xhr.open(method, url);

      Object.keys(headers).forEach((key) => {
        xhr.setRequestHeader(key, headers[key]);
      });

      xhr.onload = function cb() {
        resolve(xhr);
      };

      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.ontimeout = reject;

      if (method === METHOD.GET || !data) {
        xhr.send();
      } else {
        xhr.send(data as XMLHttpRequestBodyInit);
      }
    });
  }
}

export default new HTTP();
