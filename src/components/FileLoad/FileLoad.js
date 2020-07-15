{
  {
    /* 
  
  <label class='rw-content__load'>
    <input type="file" class='rw-content__input' required />
    <span class='rw-content__text'>Загрузить список</span>
    <div class='rw-content__title' ></div>
  </label>
  
 */
  }
}

import "./FileLoad.scss";

function constructSelf() {
  const wrapper = document.createElement("label");
  wrapper.classList.add("rw-content__load");
  const input = document.createElement("input");
  input.type = "file";
  input.name = "file-loader";
  input.classList.add("rw-content__input");
  input.addEventListener("change", function (event) {
    var input = event.srcElement;
    var fileName = input.files[0].name;
    title.textContent = fileName;
  });
  wrapper.append(input);
  const span = document.createElement("span");
  span.classList.add("rw-content__text");
  span.textContent = "Загрузить список";
  wrapper.append(span);
  const title = document.createElement("span");
  title.classList.add("rw-content__title");
  wrapper.append(title);
  return wrapper;
}

class FileLoad {
  constructor(anchor) {
    this.anchor = anchor;
    this.self = constructSelf();
    this.render();
  }

  render() {
    this.anchor.append(this.self);
  }
}

export default FileLoad;
