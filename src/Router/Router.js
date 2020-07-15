import Router from "vanilla-router";

const router = new Router({
  mode: "history",
});

router.add("/", () => {
  console.log("!!!!");
});

router.add("data", () => {
  console.log("WE ARE ON DATA");
});
router.add("card", () => {});
router.add("result", () => {});

// router.back()
export default router;
