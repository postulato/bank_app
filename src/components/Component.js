import Event from "../helpers/Event.js";

export default class Component {
  constructor(anchor, data) {
    this.anchor = anchor;
    this.name = data.name;
    this.onChange = new Event(this);
  }

  render() {
    this.anchor.append(this.self);
  }
}
