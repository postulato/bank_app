import GlobalStore from "./store/GlobalStore.js";
import "./index.scss";

GlobalStore.init();

window.addEventListener("popstate", () => {
  GlobalStore.inform({ status: "BACKED" });
});
