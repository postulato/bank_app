import "./FieldWithError.scss";
import Component from "../Component.js";

function constructSelf(inputName, value, cb) {
  const wrapper = document.createElement("div");
  wrapper.classList.add("ef");
  const input = document.createElement("input");
  input.classList.add("ef__input");
  input.type = "text";
  input.name = inputName;
  input.value = value;
  input.addEventListener("change", cb);
  wrapper.append(input);
  const div = document.createElement("div");
  div.classList.add("ef__error");
  wrapper.append(div);
  return wrapper;
}

class FieldWithError extends Component {
  /**
   *
   * @param {DOM} anchor
   * @param {ObjData} input data
   * @param {Function} callback on change
   */
  constructor(anchor, data) {
    super(anchor, data);
    this.self = constructSelf(
      data.name,
      data.value,
      this.onChange.broadcast.bind(this.onChange)
    );
    this.render();
  }

  // getValue() {
  //   return this.self.getElementsByClassName("ef_input")[0].value;
  // }

  // TODO: добавить возможность элементу отдавать свое значение (всем остальным добавить тоже)
}

export default FieldWithError;
