export default function (formData) {
  let isValidData = true;
  for (let propName in formData.data) {
    if (formData.data[propName].error) {
      isValidData = false;
      break;
    }
  }
  formData.isValid = isValidData;
  return formData.isValid;
}
