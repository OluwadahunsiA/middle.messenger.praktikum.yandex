/* eslint-disable @typescript-eslint/no-explicit-any */
export type EventListener = (...args: any[]) => void;

export default class EventBus {
  listeners: Record<string, any>;

  constructor() {
    this.listeners = {};
  }

  on(event: string, callback: EventListener) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }

    this.listeners[event].push(callback);
  }

  off(event: string, callback: EventListener) {
    if (!this.listeners[event]) {
      // throw new Error(`No such event: ${event}`);
      return;
    }
    this.listeners[event] = this.listeners[event].filter(
      (listener: EventListener) => {
        return listener !== callback;
      }
    );
  }

  emit(event: string, ...args: any) {
    if (!this.listeners[event]) {
      // throw new Error(`No such event: ${event}`);
      return;
    }

    this.listeners[event].forEach((listener: EventListener) =>
      listener(...args)
    );
  }
}
