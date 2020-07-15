import belFlag from "../../assets/bel-flag.png";
import worldFlag from "../../assets/world-flag.png";
import Component from "../Component.js";
import imask from "imask";
import "./PhoneNumber.scss";

function img(type) {
  const image = document.createElement("img");
  image.classList.add("pn__flag-img");
  image.src = type === "bel" ? belFlag : worldFlag;
  return image;
}

function mask(el) {
  const maskOptions = {
    mask: "+000 00 000-00-00",
  };

  imask(el, maskOptions);
}

function checkFlag(el, flagKeeper) {
  const val = el.value;
  if (!val.length) return;

  const flag = flagKeeper.getElementsByClassName("pn__flag-img")[0];
  let isBel = /\+375/.test(val);

  if (flag) {
    if (!flag.classList.contains("bel") && isBel) {
      flag.remove();
      flagKeeper.append(img("bel"));
    } else {
      flag.remove();
      flagKeeper.append(img("world"));
    }
  } else {
    flagKeeper.append(isBel ? img("bel") : img("world"));
  }
}

function constructSelf(data, cb) {
  const wrapper = document.createElement("div");
  wrapper.classList.add("pn");

  const flagHolder = document.createElement("div");
  flagHolder.classList.add("pn__flag-holder");
  wrapper.append(flagHolder);

  const input = document.createElement("input");
  input.classList.add("pn__input");
  input.value = data.value;
  input.name = data.name;
  checkFlag(input, flagHolder);
  input.addEventListener("change", cb);
  input.addEventListener("change", (e) => {
    checkFlag(e.target, flagHolder);
  });
  input.addEventListener("keyup", (e) => {
    checkFlag(e.target, flagHolder);
  });
  mask(input);

  wrapper.append(input);

  return wrapper;
}

class PhoneNumber extends Component {
  constructor(anchor, data) {
    super(anchor, data);
    this.self = constructSelf(
      data,
      this.onChange.broadcast.bind(this.onChange)
    );
    this.render();
  }
}

export default PhoneNumber;
