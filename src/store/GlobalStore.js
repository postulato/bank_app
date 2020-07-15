import RegistrationWayLayout from "../layouts/RegistrationWayLayout/RegistrationWayLayout.js";
import FormDataLayout from "../layouts/FormDataLayout/FormDataLayout.js";
import Router from "../Router/Router.js";

class GlobalStore {
  constructor() {
    this.state = {
      currentState: "rwState",
      currentView: null,
      previousView: null,
      rwState: new RegistrationWayLayout(document.getElementById("root")),
      formDataState: new FormDataLayout(document.getElementById("root")),
    };
    this.subscribers = [];
  }

  init() {
    // this.state.currentView = this.state.formDataState;
    this.state.currentView = this.state.rwState;
    this.state.currentView.render();
    this.state.currentView.render("form"); //!! DELETE THIS
  }

  inform(action) {
    console.log("GLOBALSTORE INFORMED", action);
    switch (action.status) {
      case "personal":
        if (this.state.currentView instanceof RegistrationWayLayout) {
          this.state.previousView = this.state.currentView;
          this.state.currentView.unmount();
          this.state.currentView = this.state.formDataState;
          this.state.currentView.render();
        }
        break;
      case "list":
        Router.navigateTo("data");
        if (this.state.currentView instanceof RegistrationWayLayout) {
          this.state.previousView = this.state.currentView;
          this.state.currentView.unmount();
          this.state.currentView = this.state.formDataState;
          this.state.currentView.render();
        }
        break;
      case "BACKED":
        console.warn(this.state.currentView);
        this.state.currentView.unmount();
        this.state.currentView = this.state.previousView;
        this.state.currentView.render();
        break;
    }
  }

  subscribe(f) {
    this.subscribers.push(s);
  }

  unsubscribe(f) {
    this.subscribers = this.subscribers.filter((s) => s !== f);
  }

  broadcast(payload) {
    this.subscribers.forEach((s) => s(payload));
  }
}

export default new GlobalStore();
