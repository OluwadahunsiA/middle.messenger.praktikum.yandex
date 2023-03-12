import http from "../core/HTTP";

class Authentication {
  signup(data: XMLHttpRequestBodyInit) {
    return http.post("auth/signup", {
      headers: { "Content-Type": "application/json" },
      data,
    });
  }

  signin(data: XMLHttpRequestBodyInit) {
    return http.post("auth/signin", {
      headers: { "Content-Type": "application/json" },
      data,
    });
  }

  logout() {
    return http.post("auth/logout", {
      headers: { "Content-Type": "application/json" },
    });
  }

  user() {
    return http.get("auth/user", {
      headers: { "Content-Type": "application/json" },
    });
  }
}

export default new Authentication();
