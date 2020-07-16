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
  } else if (prop.value.length < 10) {
    prop.error = "Введите дату в формате дд.мм.гггг";
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

function isValidCard(prop) {
  if (prop.value.length !== 19) {
    prop.error = "Введите корректный номер карты";
  }
}

function isValidDateShort(prop) {
  console.log(prop);
  if (prop.value.length < 5) {
    prop.error = "Введите корректную дату";
  }
}

function isValidCVC(prop) {
  if (prop.value.length < 3) {
    prop.error = "Введите корректный CVC";
  }
}

export default function validator(state) {
  const gender = state.data.gender && state.data.gender.value;
  for (let propName in state.data) {
    let prop = state.data[propName];
    prop.error = null;
    if (
      (prop.mark === "male" && gender === "Женский") ||
      (prop.mark === "female" && gender === "Мужской")
    )
      continue;

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
      case "number":
        isValidCard(prop);
        break;
      case "number-short":
        isValidCVC(prop);
        break;
      case "date-short":
        isValidDateShort(prop);
        break;
    }
    isNotEmpty(prop);
  }
  return state;
}
