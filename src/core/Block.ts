/* eslint-disable @typescript-eslint/no-this-alias */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable @typescript-eslint/no-non-null-assertion */
import Handlebars from "handlebars";
import EventBus from "./EventBus";
import { nanoid } from "nanoid";

type PropsType = Record<string, any>;

export default class Block {
  static EVENTS = {
    INIT: "init",
    FLOW_CDM: "flow:component-did-mount",
    FLOW_CDU: "flow:component-did-update",
    FLOW_RENDER: "flow:render",
  };

  id = nanoid(6);

  _element: HTMLElement | null = null;

  props: PropsType;

  children: PropsType;

  eventBus: () => EventBus;

  references: { [key: string]: HTMLElement } = {};

  tagName: string;

  public constructor(allProps?: PropsType, tagName = "div") {
    allProps = allProps ?? ({} as PropsType);
    const { children, props } = this._filterChildrenFromAllProps(allProps);
    this.children = children;
    this.props = props;

    this.tagName = tagName;

    const eventBus = new EventBus();
    this.eventBus = () => eventBus;

    this.props = this._makePropsProxy(props || ({} as PropsType));

    this.children = this._makePropsProxy(this.children);

    this._registerEvents(eventBus);

    eventBus.emit(Block.EVENTS.INIT, this.props);
  }

  _filterChildrenFromAllProps(allProps?: PropsType) {
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
    this._element = this._createDocumentElement(this.tagName);
  }

  init() {
    this._createResources();
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER, this.props);
  }

  _componentDidMount(props: PropsType) {
    this.componentDidMount(props);
  }

  dispatchComponentDidMount() {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

  componentDidMount(_props: PropsType) {}

  _componentDidUpdate(oldProps: PropsType, newProps: PropsType) {
    const response = this.componentDidUpdate(oldProps, newProps);
    if (!response) {
      return;
    }
    this._render();
  }

  componentDidUpdate(_oldProps: PropsType, _newProps: PropsType) {
    return true;
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

  _render() {
    const renderResult: any = this.render();
    this._removeEvents();
    const newElement = renderResult?.firstElementChild;
    // this._element?.replaceWith(newElement);
    this._element = newElement as HTMLElement;
    this._addEvents();
  }

  render() {}

  getContent(): HTMLElement {
    if (this.element?.parentNode?.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
      setTimeout(() => {
        if (
          this.element?.parentNode?.nodeType !== Node.DOCUMENT_FRAGMENT_NODE
        ) {
          this.eventBus().emit(Block.EVENTS.FLOW_CDM);
        }
      }, 100);
    }

    return this.element!;
  }

  _makePropsProxy(props: PropsType): any {
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
        throw new Error("You do not have access to this");
      },
    });
  }

  _createDocumentElement(tagName: string) {
    return document.createElement(tagName);
  }

  _removeEvents() {
    const { events } = this.props as PropsType;

    if (!events || !this._element) {
      return;
    }

    Object.keys(events).forEach((event) => {
      if (this._element) {
        this._element?.removeEventListener(event, events[event]);
      }
    });
  }

  _addEvents() {
    const { events } = this.props as PropsType;

    if (!events) {
      return;
    }

    Object.keys(events).forEach((event) => {
      if (this._element) {
        this._element!.addEventListener(event, events[event], true);
      }
    });
  }

  show() {
    this.getContent().style.display = "block";
  }

  hide() {
    this.getContent().style.display = "none";
  }

  compile(Incomingtemplate: string): DocumentFragment {
    const properties: any = { ...this.props };
    Object.entries(this.children).forEach(([key, value]) => {
      properties[key] = `<div data-id="${value.id}"></div>`;
    });
    const createdTemplate = document.createElement("template");

    const compiledTemplate = Handlebars.compile(Incomingtemplate);
    createdTemplate.innerHTML = compiledTemplate({
      ...this.props,
      children: this.children,
      refs: this.references,
      ...properties,
    });

    Object.entries(this.children).forEach(([, child]) => {
      const selectedElement = createdTemplate.content.querySelector(
        `[data-id="${child.id}"]`
      );

      if (!selectedElement) {
        return;
      }

      const selectedElementChildren = selectedElement.childNodes.length
        ? selectedElement.childNodes
        : [];

      const content = child.getContent();
      selectedElement.replaceWith(content);
      
      const layoutContent = content?.querySelector('[data-layout="1"]');
      if (layoutContent && selectedElementChildren.length) {
        layoutContent.append(...selectedElementChildren);
      }
    });

    return createdTemplate.content;
  }
}
