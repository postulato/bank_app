import Component from "../Component.js";
import mask from "../../helpers/mask.js";
import "./FieldNumber.scss";

function constructSelf(inputName, value, cb) {
  const wrapper = document.createElement("div");
  wrapper.classList.add("number-wrapper");

  const input = document.createElement("input");
  input.value = value;
  input.name = inputName;

  if (inputName === "cardNumber") {
    input.classList.add("number-full");
    input.type = "text";
    mask(input, "0000 0000 0000 0000");
  } else {
    input.classList.add("number-short");
    input.type = "password";
    input.maxLength = 3;
  } 
  input.addEventListener("change", cb);

  wrapper.append(input);
  return wrapper;
}

class FieldNumber extends Component {
  constructor(anchor, data) {
    super(anchor, data);
    this.self = constructSelf(
      data.name,
      data.value,
      this.onChange.broadcast.bind(this.onChange)
    );
    this.render();
  }
}

export default FieldNumber;
