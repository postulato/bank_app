import Component from "../Component.js";
import "./FilterSelect.scss";

function constructSelf(data, cb) {
  function filterNames() {
    // get input val
    let filterValue = input.value.toUpperCase();

    // // get select
    // let items = document.getElementsByClassName("sf-container__items")[0];

    // get options
    let itemsCollection = containerItems.getElementsByClassName(
      "sf-container__item"
    );

    for (let i = 0; i < itemsCollection.length; i++) {
      let elemText = itemsCollection[i].textContent;

      if (elemText.toUpperCase().indexOf(filterValue) > -1) {
        itemsCollection[i].style.display = "";
      } else {
        itemsCollection[i].style.display = "none";
      }
    }
  }
  function showMenu() {
    if (containerItems.classList.contains("active")) {
      containerItems.classList.remove("active");
    } else {
      containerItems.classList.add("active");
    }
  }
  function itemClickHandler(e) {
    input.value = e.target.textContent.trim();
    containerItems.classList.remove("active");
    input.focus();
  }
  const wrapper = document.createElement("div");
  wrapper.classList.add("sf-container");

  const containerSelected = document.createElement("div");
  containerSelected.classList.add("sf-container__selected");
  wrapper.append(containerSelected);

  const input = document.createElement("input");
  input.name = data.name;
  input.type = "text";
  input.value = data.value;
  input.classList.add("sf-container__input");
  input.addEventListener("keyup", filterNames);
  input.addEventListener("keydown", () => {
    if (!containerItems.classList.contains("active")) {
      containerItems.classList.add("active");
    }
  });
  input.addEventListener("click", showMenu);
  input.addEventListener("change", cb);
  input.addEventListener("focus", cb);
  containerSelected.append(input);

  const arrowHolder = document.createElement("div");
  arrowHolder.classList.add("sf-container__arrow-holder");
  arrowHolder.addEventListener("click", showMenu);
  containerSelected.append(arrowHolder);

  const containerItems = document.createElement("div");
  containerItems.classList.add("sf-container__items", "fashion-scroll");
  containerItems.addEventListener("click", itemClickHandler);
  data.options.forEach((opt) => {
    const el = document.createElement("div");
    el.classList.add("sf-container__item");
    el.textContent = opt;
    containerItems.append(el);
  });

  wrapper.append(containerItems);
  return wrapper;
}

class FilterSelect extends Component {
  constructor(anchor, data) {
    super(anchor, data);
    this.self = constructSelf(
      data,
      this.onChange.broadcast.bind(this.onChange)
    );
    this.render();
  }
}

export default FilterSelect;
