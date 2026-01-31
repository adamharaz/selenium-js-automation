


export const RegistrationPage = {
  firstName: "//input[@id='firstName']",
  lastName: "//input[@id='lastName']",
  email: "//input[@id='userEmail']",

  genderMale: "//label[@for='gender-radio-1']",
  genderFemale: "//label[@for='gender-radio-2']",
  genderOther: "//label[@for='gender-radio-3']",

  mobile: "//input[@id='userNumber']",
  subjects: "//input[@id='subjectsInput']",

  hobbySports: "//label[@for='hobbies-checkbox-1']",
  hobbyReading: "//label[@for='hobbies-checkbox-2']",
  hobbyMusic: "//label[@for='hobbies-checkbox-3']",

  upload: "//input[@id='uploadPicture']",
  address: "//textarea[@id='currentAddress']",

  stateCtrl: `(//div[@class=" css-tlfecz-indicatorContainer"])[1]`,
  cityCtrl: "//div[@id='city']//div[contains(@class,'control')]",

  submit: "//button[@id='submit']",

  modalTitle: "//div[@id='example-modal-sizes-title-lg']",
  modalTable: "//div[contains(@class,'modal-body')]//table",

  optionByText: (txt) => `//div[contains(@id,'react-select') and contains(@id,'-option-') and normalize-space(.)='${txt}']`,

  stateOptionByText: (txt) => `//div[starts-with(@id,'react-select-3-option-') and normalize-space(.)='${txt}']`,
  cityOptionByText: (txt) => `//div[starts-with(@id,'react-select-4-option-') and normalize-space(.)='${txt}']`,
};
