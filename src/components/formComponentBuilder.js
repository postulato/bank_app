import "./Button/Button.js";
import "./FileLoad/FileLoad";
import "./RadioWithLabel/RadioWithLabel";
import "../store/FormDataStore";
import FieldWithError from "./FieldWithError/FieldWithError";
import FormDataStore from "../store/FormDataStore";
import InputDate from "./InputDate/InputDate";
import RadioWithLabel from "./RadioWithLabel/RadioWithLabel";
import FilterSelect from "./FilterSelect/FilterSelect";
import TextArea from "./TextArea/TextArea.js";
import PhoneNumber from "./PhoneNumber/PhoneNumber.js";
import FieldNumber from "./FieldNumber/FieldNumber.js";

// TODO: компонент билдер должен добавлять брать данные из формдатыстора для того чтобы назначать их в инпуты
export default function componentBuilder(data) {
  if (data.mark === "male" && FormDataStore.gender === "female")
    return document.createDocumentFragment();
  if (data.mark === "female" && FormDataStore.gender === "male")
    return document.createDocumentFragment();

  const wrapper = document.createElement("div");
  wrapper.classList.add("form__field");
  wrapper.addEventListener("click", function () {
    const el = this.getElementsByClassName("form__error")[0];
    el && el.remove();
  });
  const label = document.createElement("div");
  label.classList.add("form__label");
  label.textContent = data.label;
  wrapper.append(label);
  const inputWrapper = document.createElement("div");
  inputWrapper.classList.add("form__input");
  wrapper.append(inputWrapper);

  if (data.tip) {
    const tipWrapper = document.createElement("div");
    tipWrapper.classList.add("tip-wrapper");
    let tip = null;
    if (data.tip.type === "link") {
      tip = document.createElement("a");
      tip.classList.add("tip__lnk", "tip");
      tip.target = "_blank";
      tip.href = data.tip.href;
    } else {
      tip = document.createElement("span");
      tip.classList.add("tip__default", "tip");
    }

    tip.textContent = data.tip.text;
    tipWrapper.append(tip);
    wrapper.append(tipWrapper);
  }
  const informDataStore = FormDataStore.inform.bind(FormDataStore);
  switch (data.type) {
    case "mail":
    case "text":
      const textEl = new FieldWithError(inputWrapper, data);
      textEl.onChange.subscribe(informDataStore);
      break;
    case "date":
    case "date-short":
      const dateEl = new InputDate(inputWrapper, data);
      dateEl.onChange.subscribe(informDataStore);
      break;
    case "radio":
      const rb1 = new RadioWithLabel(
        inputWrapper,
        data.options[0],
        data.name,
        data.value === data.options[0]
      );
      const rb2 = new RadioWithLabel(
        inputWrapper,
        data.options[1],
        data.name,
        data.value === data.options[1]
      );
      rb1.onChange.subscribe(informDataStore);
      rb2.onChange.subscribe(informDataStore);
      break;
    case "list":
      const filterEL = new FilterSelect(inputWrapper, data);
      filterEL.onChange.subscribe(informDataStore);
      break;
    case "textarea":
      const ta = new TextArea(inputWrapper, data);
      ta.onChange.subscribe(informDataStore);
      break;
    case "tel":
      const phoneEl = new PhoneNumber(inputWrapper, data);
      phoneEl.onChange.subscribe(informDataStore);
      break;
    case "number":
    case "number-short":
      const numberEl = new FieldNumber(inputWrapper, data);
      numberEl.onChange.subscribe(informDataStore);
      break;
  }
  return wrapper;
}
