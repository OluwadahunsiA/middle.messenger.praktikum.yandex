/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import Block from "./Block";
import ValidateForm from "./ValidateForms";

export const formEvents = {
  focus: (event: Event) => {
    //@ts-ignore
    if (event.target?.nodeName === "INPUT") {
      const element = event.target as HTMLInputElement;
      const { error } = ValidateForm.verifyElement(element);
      element.nextElementSibling!.textContent = error;
    }
  },

  blur: (self: Block, event: Event) => {
    event.preventDefault();
    event.stopPropagation();

    const element = event.target as HTMLInputElement;

    if (element.nodeName === "INPUT") {
      const { value, error } = ValidateForm.verifyElement(element);
      if (error && element.value) {
        element.nextElementSibling!.textContent = error;
      } else {
        element.nextElementSibling!.textContent = "";
      }
      self.setProps({
        value,
        error,
      });
    }
  },

  getInput: (event: Event, state: Record<string, any>) => {
    const element = event.target as HTMLInputElement;
    const elementName = element.name;

    const { value } = element;
    Object.assign(state, { [elementName]: value });
   
  },

  submit: (event: Event, state?: Record<string, any>) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const validateFormContent = ValidateForm.validateSubmit(form);
    let passwordValue = "";
    let repeatPasswordValue = "";
    let passwordId = "";
    let repeatPasswordId = "";

    Array.from(form.children).forEach((child) => {
      const input = child.querySelector("input");
      input?.focus();

      if (input?.id === "password" || input?.id === "newPassword") {
        passwordValue = input.value;
        passwordId = input.id;
      }
      if (input?.id === "repeatPassword" || input?.id === "repeatNewPassword") {
        repeatPasswordValue = input.value;
        repeatPasswordId = input.id;
      }
    });

    if (
      passwordValue &&
      repeatPasswordValue &&
      passwordValue !== repeatPasswordValue
    ) {
      //@ts-ignore
      document.getElementById(passwordId).nextElementSibling!.textContent =
        "passwords do not match";

      //@ts-ignore
      document.getElementById(
        repeatPasswordId
      ).nextElementSibling!.textContent = "passwords do not match";
    }

    console.log(
      "formSubmissionStatus:",
      validateFormContent,
      "formInputValues",
      state
    );
  },
};
