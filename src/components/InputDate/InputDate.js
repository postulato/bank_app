import Component from "../Component.js";
import calendarIcon from "./assets/clndr-1.png";
import "./InputDate.scss";
// !! TRY ADD MASK HERE!!
function constructSelf(data, cb) {
  function checkValue(str, max) {
    if (str.charAt(0) !== "0" || str == "00") {
      var num = parseInt(str);
      if (isNaN(num) || num <= 0 || num > max) num = 1;
      str =
        num > parseInt(max.toString().charAt(0)) && num.toString().length == 1
          ? "0" + num
          : num.toString();
    }
    return str;
  }
  const wrapper = document.createElement("div");
  wrapper.classList.add("input-date-wrapper");
  const input = document.createElement("input");
  if (data.name === "birthDate") {
    input.classList.add("input-date");
    input.type = "text";
    input.name = data.name;
    input.value = data.value;
    input.maxLength = 10;
    input.addEventListener("keydown", function (e) {
      const el = e.target.value;
      if (/\D\/$/.test(el)) el = el.substr(0, el.length - 3);
      const values = el.split("/").map(function (v) {
        return v.replace(/\D/g, "");
      });
      if (values[0]) values[0] = checkValue(values[0], 12);
      if (values[1]) values[1] = checkValue(values[1], 31);
      const output = values.map(function (v, i) {
        return v.length == 2 && i < 2 ? v + "/" : v;
      });
      e.target.value = output.join("").substr(0, 14);
    });
  } else {
    input.classList.add("input-date", "input-date--fullwidth");
    input.type = "text";
    input.name = data.name;
    input.value = data.value;
    input.maxLength = 5;
    input.addEventListener("keydown", function (e) {
      if (
        /[a-zA-Z\[\]'";`\-\+!@#$%^&*()/\\,.?":{}|<>]/.test(e.key) &&
        e.key.length === 1
      ) {
        e.preventDefault();
      }
      if (e.which !== 8) {
        var numChars = e.target.value.length;
        if (numChars === 2) {
          var thisVal = e.target.value;
          thisVal += "/";
          e.target.value = thisVal;
        }
      }
    });
  }

  // input.addEventListener("keydown", (e) => {});
  input.addEventListener("change", cb);

  wrapper.append(input);
  if (data.name === "birthDate") {
    const icon = document.createElement("img");
    icon.src = calendarIcon;
    wrapper.append(icon);
  }
  return wrapper;
}

class InputDate extends Component {
  /**
   *
   * @param {DOM} anchor
   * @param {ObjData} data input
   * @param {Function} callback onchange
   */
  constructor(anchor, data) {
    super(anchor, data);
    this.self = constructSelf(
      data,
      this.onChange.broadcast.bind(this.onChange)
    );
    this.render();
  }
}

export default InputDate;
