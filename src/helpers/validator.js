function isNotEmpty(prop) {
  if (prop.value.length === 0) {
    prop.error = "Заполните это поле";
  }
}
function isValidPhoneNumber(prop) {
  if (prop.value.length !== 17) {
    prop.error = "Введите правильный номер";
  }
}
function isValidDate(prop) {
  const arr = prop.value.split("/");
  if (+arr[0] > 31 && +arr[1] > 12) {
    prop.error = "Введите правильную дату";
  }
}
function isValidList(prop) {
  if (!prop.options.some((str) => str === prop.value)) {
    prop.error = "Выберите вариант, который есть в списке";
  }
}
function isValidMail(prop) {
  if (
    !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      prop.value
    )
  ) {
    prop.error = "Введите правильный email";
  }
}

export default function validator(state) {
  for (let propName in state.data) {
    let prop = state.data[propName];
    prop.error = null;
    isNotEmpty(prop);
    switch (prop.type) {
      case "mail":
        isValidMail(prop);
        break;
      case "date":
        isValidDate(prop);
        break;
      case "list":
        isValidList(prop);
        break;
      case "tel":
        isValidPhoneNumber(prop);
        break;
    }
  }
  return state;
}
