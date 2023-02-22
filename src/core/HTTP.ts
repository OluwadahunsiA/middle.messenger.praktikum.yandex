/* eslint-disable @typescript-eslint/no-explicit-any */
enum METHOD {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
}

type RequestOptions = {
  method: METHOD;
  data?: Record<string, any>;
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

export default class HTTPTransport {
  get: HTTPMethodType = (url, options = {}) => {
    if (options.data) {
      url = `${url}${queryStringify(options.data)}`;
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

      xhr.open(method, url);

      Object.keys(headers).forEach((key) => {
        xhr.setRequestHeader(key, headers[key]);
      });

      xhr.onload = function () {
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
