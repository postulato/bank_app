import Button from "../../components/Button/Button.js";
import FormDataStore from "../../store/FormDataStore";
import constructError from "../../components/errorBuilder";
import formComopnentBuilder from "../../components/formComponentBuilder";
import validator from "../../helpers/validator";
import checkErrors from "../../helpers/checkErrors";
import "./FormDataLayout.scss";

function constructSelf() {
  const wrapper = document.createElement("div");
  wrapper.classList.add("process-wrapper");
  const template = ` 
  <div class='process'>
    <div class="process__header">Типовая форма</div>
    <div class="process__data-wrapper">
      <div class="process__cards">
        <div class="process__card process__card--active">
          Личные данные
        </div>
        <div class="process__card">
          Данные кредитной карты
        </div>
        <div class="process__card">
          Результат
        </div>
      </div>
      <div class="process__main fashion-scroll"></div>
      <div class="process__footer">
      </div>
    </div>
  </div>`;
  wrapper.insertAdjacentHTML("afterbegin", template);

  const globalBtn = new Button(
    wrapper.getElementsByClassName("process__footer")[0],
    "Далее"
  );
  globalBtn.onChange.subscribe(FormDataStore.inform.bind(FormDataStore));
  return wrapper;
}
/**
 *
 * @param {string} type form | card
 */
function constructFormData(type) {
  const wrapper = document.createElement("div");
  wrapper.classList.add("form");
  const template = `
    <div class='form__header'>Все поля формы обязательны для заполнения</div>
    <div class='form__main'></div>
  `;

  wrapper.insertAdjacentHTML("afterbegin", template);
  const formMain = wrapper.getElementsByClassName("form__main")[0]; // check this wether it an unnecessary wrapper

  if (type === "form") {
    for (let inputName in FormDataStore[type]["data"]) {
      formMain.append(
        formComopnentBuilder(FormDataStore[type]["data"][inputName])
      );
    }
  } else if (type === "card") {
    for (let inputName in FormDataStore[type]["data"]) {
      formMain.append(
        formComopnentBuilder(FormDataStore[type]["data"][inputName])
      );
    }
  } else if (type === "result") {
    wrapper.append("this is result");
  }
  return wrapper;
}

class FormDataLayout {
  constructor(anchor) {
    this.anchor = anchor;
    this.self = constructSelf();
    this.mainPlaceholder = this.self.getElementsByClassName("process__main")[0];
    FormDataStore.subscribe((action) => {
      switch (action.type) {
        case "VALIDATE":
          this.validate(action.payload);
          break;
        case "ATTACH_ERRORS":
          break;
        case "SWITCH_NEXT":
          break;
        case "SWITCH_PREV":
          break;
        case "RERENDER":
          this.render(action.payload);
          break;
      }
    });
  }

  /**
   *
   * @param {string} type data | card | result | undefined
   */
  render(type = "form") {
    this.self
      .getElementsByClassName("process__card--active")[0]
      .classList.remove("process__card--active");
    if (type === "form") {
      this.self
        .getElementsByClassName("process__card")[0]
        .classList.add("process__card--active");
    } else if (type === "card") {
      this.self
        .getElementsByClassName("process__card")[1]
        .classList.add("process__card--active");
    } else {
      this.self
        .getElementsByClassName("process__card")[2]
        .classList.add("process__card--active");
    }

    if (!this.self.parentNode) {
      this.anchor.append(this.self);
    }
    if (this.mainPlaceholder.children[0]) {
      this.mainPlaceholder.children[0].remove();
    }
    this.mainPlaceholder.append(constructFormData(type));
  }

  validate(data) {
    if (checkErrors(validator(data))) {
      FormDataStore.inform({ name: "CAN_PROCEED" });
    } else {
      this.attachErrors();
    }
  }

  attachErrors() {
    const data = FormDataStore.getState().data;

    const elems = [...Array.from(this.self.getElementsByTagName("input"))];
    if (FormDataStore.status === "form") {
      elems.push(this.self.getElementsByTagName("textarea")[0]);
    }
    elems.forEach((el) => {
      if (
        data[el.name].error &&
        !el.closest(".form__field").getElementsByClassName("form__error").length
      ) {
        el.closest(".form__field").append(constructError(data[el.name].error));
      }
    });
  }

  unmount() {
    this.self.remove();
  }
}

export default FormDataLayout;
