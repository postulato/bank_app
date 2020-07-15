import Component from "../Component";
import "./Button.scss";

function constructSelf(text, name, cb) {
  const btn = document.createElement("button");
  btn.addEventListener("click", cb);
  btn.classList.add("btn");
  btn.name = name;
  btn.textContent = text;
  return btn;
}

class Button extends Component {
  /**
   * @param {anchor} DOMelement element parent
   * @param {text} string button text
   * @param {cb} function callback of the button onClick
   *  */

  constructor(anchor, text) {
    super(anchor, { name: "btn-global" });
    this.self = constructSelf(
      text,
      "btn-global",
      this.onChange.broadcast.bind(this.onChange)
    );
    this.render();
  }

  render() {
    this.anchor.append(this.self);
  }
}

export default Button;
