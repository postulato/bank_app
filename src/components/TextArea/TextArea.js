import Component from "../Component.js";
import "./TextArea.scss";

function constructSelf(data, cb) {
  const wrapper = document.createElement("div");
  wrapper.classList.add("ta");

  const textArea = document.createElement("textarea");
  textArea.classList.add("ta__input", "fashion-scroll");
  textArea.name = data.name;
  textArea.value = data.value;
  textArea.addEventListener("change", cb);
  wrapper.append(textArea);

  return wrapper;
}

class TextArea extends Component {
  constructor(anchor, data) {
    super(anchor, data);
    this.self = constructSelf(
      data,
      this.onChange.broadcast.bind(this.onChange)
    );
    this.render();
  }

  // render() {
  //   this.anchor.append(this.self);
  // }
}

export default TextArea;
