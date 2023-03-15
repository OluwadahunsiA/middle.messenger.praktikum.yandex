/* eslint-disable @typescript-eslint/no-explicit-any */
import Route from "./Route";
import Store from "./Store";

class Router {
  private routes: Route[] = [];

  private history = window.history;

  private _currentRoute: null | Route | undefined;

  static __instance: Router;

  isAuthenticated: boolean;

  constructor() {
    if (Router.__instance) {
      return Router.__instance;
    }

    this.routes = [];
    this.history = window.history;
    this._currentRoute = null;

    Router.__instance = this;

    this.isAuthenticated = Store.getState()?.isAuth;

  
  }

  use(pathname: string, block: any, props: Record<string, any> = {}) {
    const route = new Route(pathname, block, props);
    this.routes.push(route);
    return this;
  }

  start() {
    window.onpopstate = (event: Event) => {
      this._onRoute((event.currentTarget as Window).location.pathname);
    };

    this._onRoute(window.location.pathname);
  }

  _onRoute(pathname: string) {
    const route = this.getRoute(pathname);

    if (!route) {
      return;
    }

    if (this._currentRoute && this._currentRoute !== route) {
      this._currentRoute.leave();
    }

    this._currentRoute = route;

    route.render();
  }

  go(pathname: string) {
    this.history.pushState({}, "", pathname);
    this._onRoute(pathname);
  }

  back() {
    this.history.back();
  }

  forward() {
    this.history.forward();
  }

  getRoute(pathname: string) {
    return this.routes.find(
      (route) =>
        route.match(pathname) || this.routes.find((route) => route.match("*"))
    );
  }

  redirect(pathname: string) {
    if (
      !this.isAuthenticated &&
      this.getRoute(window.location.pathname)?._props.isPrivateRoute
    ) {
      this.go(pathname);
    }
  }
}

export default new Router();
