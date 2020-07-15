export default class Event {
  constructor(sender) {
    this._sender = sender;
    this._listeners = [];
  }

  subscribe(listener) {
    this._listeners.push(listener);
  }
  broadcast(args) {
    this._listeners.forEach((listener) => listener(this._sender, args));
  }
}
