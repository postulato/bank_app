{
  /* <div class="rw-container">
          <div class="rw-title">Выберите способ регистрации:</div>
          <div class="rw-content">
            <div class="rw-content__field">
              <label class="radio-btn-container">
                <span class="radio-btn__text">Мужской</span>
                <input type="radio" name="radio" />
                <span class="radio-btn"></span>
              </label>
            </div>
            <div class="rw-content__field">
              <label class="radio-btn-container">
                <span class="radio-btn__text">Мужской</span>
                <input type="radio" name="radio" />
                <span class="radio-btn"></span>
              </label>
            </div>
            <div class="rw-content__field">
              <div class="rw-content__load">
                <input type="file" value="Загрузить" />
              </div>
            </div>
            <div class="rw-content__field">
              <button class="btn">Далее</button>
            </div>
          </div>
        </div> */
}
import RadioWithLabel from "../../components/RadioWithLabel/RadioWithLabel.js";
import Button from "../../components/Button/Button.js";
import GlobalStore from "../../store/GlobalStore.js";
import FileLoad from "../../components/FileLoad/FileLoad.js";
import RwStore from "../../store/RwStore";
import "./RegistrationWayLayout.scss";

function constructSelf() {
  const template = `
          <div class="rw-title">Выберите способ регистрации:</div>
          <div class="rw-content">
            <div class="rw-content__field">
            </div>
            <div class="rw-content__field">
            </div>
            <div class="rw-content__field">
            </div>
            <div class="rw-content__field">
            </div>
          </div>
`;
  const divWrapper = document.createElement("div");
  divWrapper.classList.add("rw-container");
  divWrapper.insertAdjacentHTML("afterbegin", template);
  const fields = divWrapper.getElementsByClassName("rw-content__field");

  const elem = new RadioWithLabel(
    fields[0],
    "Персональная",
    "rw",
    RwStore.state.status === "personal"
  );
  elem.onChange.subscribe(RwStore.inform.bind(RwStore));

  const elem2 = new RadioWithLabel(
    fields[1],
    "Регистрация пользователей списком",
    "rw",
    RwStore.state.status === "list"
  );
  elem2.onChange.subscribe(RwStore.inform.bind(RwStore));
  const elem4 = new Button(fields[3], "Далее", () => {
    GlobalStore.inform(RwStore.getState());
  });
  elem4.onChange.subscribe(RwStore.inform.bind(RwStore));
  return divWrapper;
}

function onPersonalRegister() {
  RwStore.inform("personal");
}

function onListRegister() {
  RwStore.inform("list");
}

class RegistrationWay {
  constructor(anchor) {
    this.self = constructSelf();
    this.anchor = anchor;
    RwStore.subscribe(this.toggleFileLoad.bind(this));
  }

  toggleFileLoad(action) {
    if (action.type === "changedStatus") {
      console.log("STATUSSSSSSSSSSS", action);
    }
    if (action.status === "personal") {
      this.removeFileLoad();
    } else {
      this.addFileLoad();
    }
  }

  removeFileLoad() {
    const fileLoad = this.self.getElementsByClassName("rw-content__load")[0];
    fileLoad.remove();
  }

  addFileLoad() {
    const fileLoadAnchor = this.self.getElementsByClassName(
      "rw-content__field"
    )[2];
    new FileLoad(fileLoadAnchor);
  }

  getState() {}

  render() {
    this.anchor.append(this.self);
  }

  unmount() {
    this.self.remove();
  }
}

export default RegistrationWay;
