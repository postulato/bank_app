{
  /* <label class="radio-btn-container">
<span class="radio-btn__text">Мужской</span>
<input type="radio" name="radio" />
<span class="radio-btn"></span>
</label> */
}
import Component from "../Component.js";
import "./RadioWithLabel.scss";

function constructSelf(text, inputName, cb, isChecked = false) {
  const wrapper = document.createElement("label");
  wrapper.classList.add("radio-btn-container");

  const spanText = document.createElement("span");
  spanText.classList.add("radio-btn__text");
  spanText.textContent = text;
  wrapper.append(spanText);

  const input = document.createElement("input");
  input.type = "radio";
  input.value = text;
  input.name = inputName;
  input.checked = isChecked;
  input.addEventListener("change", cb);
  wrapper.append(input);

  const spanRadio = document.createElement("span");
  spanRadio.classList.add("radio-btn");
  wrapper.append(spanRadio);
  return wrapper;
}

class RadioWithLabel extends Component {
  constructor(anchor, text, inputName, isChecked) {
    super(anchor, { name: inputName });
    this.self = constructSelf(
      text,
      inputName,
      this.onChange.broadcast.bind(this.onChange),
      isChecked
    );
    this.render();
  }
}

export default RadioWithLabel;
