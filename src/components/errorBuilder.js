export default function constructError(text) {
  const er = document.createElement("div");
  er.classList.add("form__error");
  er.textContent = text;
  return er;
}
