class FormDataStore {
  constructor(status) {
    this.status = status; // DONT FORGET TO CHANGE! must be: form | card | result
    // TODO DELETE INSTANCE?
    this.form = {
      isValid: false,
      data: {
        userName: {
          label: "Имя:",
          type: "text",
          name: "userName",
          isValid: false,
          value: "",
          instance: null,
          error: null,
        },
        userLastname: {
          label: "Фамилия:",
          type: "text",
          name: "userLastname",
          isValid: false,
          value: "",
          instance: null,
          error: null,
        },
        userMiddlename: {
          label: "Отчество:",
          type: "text",
          name: "userMiddlename",
          isValid: false,
          value: "",
          instance: null,
          error: null,
        },
        birthDate: {
          label: "Дата рождения:",
          type: "date",
          name: "birthDate",
          isValid: false,
          value: "",
          instance: null,
          error: null,
        },
        gender: {
          label: "Пол:",
          type: "radio",
          name: "gender",
          value: "Мужской",
          options: ["Мужской", "Женский"],
          instance: null,
          error: null,
        },
        country: {
          label: "Страна проживания:",
          type: "list",
          name: "country",
          value: "",
          options: ["Беларусь", "Россия", "Казахстан"],
          instance: null,
          error: null,
        },
        address: {
          label: "Адрес, почтовый индекс:",
          type: "text",
          name: "address",
          value: "",
          tip: {
            text: "Узнать индекс",
            type: "link",
            href: "https://www.statkod.ru/post.html",
          },
          isValid: false,
          error: null,

          instance: null,
        },
        motherLastname: {
          label: "Девичья фамилия матери:",
          type: "text",
          name: "motherLastname",
          value: "",
          isValid: false,
          instance: null,
        },
        secretWord: {
          label: "Кодовое слово в вашем банке:",
          type: "text",
          name: "secretWord",
          value: "",
          isValid: false,
          instance: null,
        },
        textAreaHow: {
          label: "Как вы узнали о нашем сайте:",
          value: "",
          name: "textAreaHow",
          type: "textarea",
          tip: {
            text: "Из газет, телевидения, радио или проч.",
            type: "default",
          },
          instance: null,
        },
        friendEmail: {
          label: "Email друга:",
          value: "",
          name: "friendEmail",
          type: "mail",
          isValid: false,
          instance: null,
        },
        bfTel: {
          label: "Номер телефона твоего парня:",
          value: "",
          name: "bfTel",
          tip: {
            text: "Международный",
            type: "default",
          },
          mark: "female",
          type: "tel",
          isValid: false,
          instance: null,
        },
        favPen: {
          label: "Какую сковороду предпочитаешь:",
          mark: "female",
          name: "favPen",
          type: "list",
          value: "",
          options: ["Tefal", "Samsung", "Rowenta"],
          instance: null,
        },
        gfTel: {
          label: "Номер телефона своей девушки:",
          type: "tel",
          name: "gfTel",
          mark: "male",
          tip: {
            text: "Международный",
            type: "default",
          },
          value: "",
          instance: null,
        },
        fbTeam: {
          label: "Любимая футбольная команда:",
          type: "list",
          name: "fbTeam",
          mark: "male",
          value: "",
          options: ["Спартак", "Барселона", "Арсенал", "Интер", "Бавария"],
          instance: null,
        },
      },
    };
    this.card = {
      isValid: false,
      data: {
        cardNumber: {
          label: "Номер карты:",
          type: "number",
          isValid: "",
          value: "",
          instance: null,
        },
        cardDate: {
          label: "Месяц/год:",
          value: "",
          type: "date-simple", // alrdy have that comopnent , should change this
          instance: null,
        },
        cardCVC: {
          label: "CVC2 или CVV2:",
          type: "number-short",
          value: "",
          instance: null,
        },
        cardType: {
          label: "Тип карты:",
          type: "radio",
          options: ["Дебетовая", "Кредитная"],
          instance: null,
        },
      },
    };
    this.gender = "male";
    this.subscribers = [];
  }

  inform(el, ev) {
    // CLEAR INSTANCES ON UNMOUNT!
    // HERE INFORM ON INPUTS DO SMTH
    if (el.name === "btn-global") {
      this.broadcast({ type: "VALIDATE", payload: this[this.status] });
      return;
    }
    if (ev !== undefined) {
      this[this.status]["data"][el.name]["value"] = ev.target.value;
    }
    if (el.name === "CAN_PROCEED") {
      console.log("can proceed");
    }
    if (el.name === "gender") {
      this.gender = ev.target.value === "Мужской" ? "male" : "female";
      this.broadcast({ type: "RERENDER", payload: this.status });
    }
  }

  getState() {
    return this[this.status];
  }

  subscribe(f) {
    this.subscribers.push(f);
  }

  unsubscribe(f) {
    this.subscribers = this.subscribers.filter((s) => s !== f);
  }

  broadcast(payload) {
    this.subscribers.forEach((s) => s(payload));
  }
}

export default new FormDataStore("form");
