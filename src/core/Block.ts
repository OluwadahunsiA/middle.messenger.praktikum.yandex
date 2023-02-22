/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import Handlebars from "handlebars";
import EventBus from "./EventBus";

type PropsType = Record<string, any>;

export default class Block {
  static EVENTS = {
    INIT: "init",
    FLOW_CDM: "flow:component-did-mount",
    FLOW_CDU: "flow:component-did-update",
    FLOW_RENDER: "flow:render",
  };

  eventBus: () => EventBus;
  children: PropsType;
  props: PropsType;

  _element: HTMLElement | null = null;

  _meta: string;

  protected references: { [key: string]: HTMLElement } = {};

  public constructor(allProps?: PropsType, tagName = "div") {
    const eventBus = new EventBus();
    this.eventBus = () => eventBus;

    this._meta = tagName;

    allProps = allProps ?? ({} as PropsType);
    const { children, props } = this._filterChildrenFromProps(allProps);

    //check
    this.children = children;
    this.props = props;

    this.props = this._makePropsProxy(props || ({} as PropsType));
    this.children = this._makePropsProxy(this.children);

    this._registerEvents(eventBus);

    eventBus.emit(Block.EVENTS.INIT, this.props);
  }

  _filterChildrenFromProps(allProps?: PropsType) {
    const children: any = {};
    const props: any = {};

    Object.entries(allProps as PropsType).forEach(([key, value]) => {
      if (value instanceof Block) {
        children[key] = value;
      } else {
        props[key] = value;
      }
    });

    return { children, props };
  }

  _registerEvents(eventBus: EventBus) {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  _createResources() {
    this._element = this._createDocumentElement(this._meta);
  }

  init() {
    this._createResources();
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER, this.props);
  }

  _componentDidMount(props: PropsType) {
    this.componentDidMount(props);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  componentDidMount(props: PropsType) {}

  dispatchComponentDidMount() {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  componentDidUpdate(_oldProps: PropsType, _newProps: PropsType) {
    return true;
  }

  _componentDidUpdate(oldProps: PropsType, newProps: PropsType) {
    const response = this.componentDidUpdate(oldProps, newProps);

    if (!response) {
      return;
    }
    this._render();
  }

  setProps = (nextProps: PropsType) => {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
  };

  get element() {
    return this._element;
  }

  render() {}

  _render() {
    const renderedFragment: any = this.render();
    this._removeEvents();
    const newElement = renderedFragment.firstElementChild;
    this._element?.replaceWith(newElement);
    this._element = newElement as HTMLElement;

    this._addEvents();
  }

  getContent(): HTMLElement {
    return this.element!;
  }

  _makePropsProxy(props: PropsType): any {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const self = this;

    return new Proxy(props, {
      get(target: PropsType, prop: string) {
        const value = target[prop];
        return typeof value === "function" ? value.bind(target) : value;
      },

      set(target: Record<string, unknown>, prop: string, value: unknown) {
        target[prop] = value;
        self.eventBus().emit(Block.EVENTS.FLOW_CDU, { ...target }, target);
        return true;
      },

      deleteProperty() {
        throw new Error("You do not have access");
      },
    });
  }

  _createDocumentElement(tagName: string) {
    return document.createElement(tagName);
  }

  show() {
    this.getContent().style.display = "block";
  }

  hide() {
    this.getContent().style.display = "none";
  }

  _removeEvents() {
    const { events } = this.props;

    if (!events || !this._element) {
      return;
    }

    Object.keys(events).forEach((eventName) => {
      if (this._element) {
        this._element?.removeEventListener(eventName, events[eventName]);
      }
    });
  }

  _addEvents() {
    const { events } = this.props;

    if (!events) {
      return;
    }

    Object.keys(events).forEach((event) => {
      if (this._element) {
        this._element!.addEventListener(event, events[event], true);
      }
    });
  }

  compile(template: string): DocumentFragment {
    const props = { ...this.props };
    Object.entries(this.children).forEach(([key, value]) => {
      props[key] = `<div data-id="${value.id}"> </div>`;
    });

    const createdElement = document.createElement("template");

    const compiledTemplate = Handlebars.compile(template);

    createdElement.innerHTML = compiledTemplate({
      ...this.props,
      children: this.children,
      refs: this.references,
      ...props,
    });

    Object.entries(this.children).forEach(([, child]) => {
      const compStub = createdElement.content.querySelector(
        `[data-id="${child.id}]`
      );

      if (!compStub) {
        return;
      }

      const compStubChildren = compStub.childNodes.length
        ? compStub.childNodes
        : [];

      const componentContent = child.getcomponentContent();
      compStub.replaceWith(componentContent);

      const layoutContent = componentContent.querySelector('[data-layout="1"');

      if (layoutContent && compStubChildren.length) {
        layoutContent.append(...compStubChildren);
      }
    });

    return createdElement.content;
  }
}
