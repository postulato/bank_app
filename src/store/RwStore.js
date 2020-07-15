import GlobalStore from "./GlobalStore";

class RwStore {
  constructor() {
    this.state = {
      status: "personal",
    };
    this.subscribers = [];
  }

  inform(sender) {
    switch (sender.name) {
      case "rw":
        this.state.status =
          sender.self.children[1].value === "Персональная"
            ? "personal"
            : "list";
        this.broadcast({ type: "changedStatus", status: this.state.status });
        break;
      case "btn-global":
        GlobalStore.inform(this.state);
        break;
    }
  }

  subscribe(f) {
    this.subscribers.push(f);
  }

  getState() {
    return this.state;
  }

  // unsubscribe(f) {
  //   this.subscribers = this.subscribers.filter((s) => s !== f);
  // }

  broadcast(payload) {
    this.subscribers.forEach((s) => s(payload));
  }
}

export default new RwStore();
