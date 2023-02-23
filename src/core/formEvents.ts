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

    const element = event.target as HTMLInputElement

    if (element.nodeName === "INPUT") {
      const { value, error } = ValidateForm.verifyElement(element);
      console.log(value, error);
      self.setProps({
        value,
        error,
      });
    }
  },

  input: (event: Event, state: Record<string, any>) => {
    const element = event.target as HTMLInputElement;
    const elementName = element.name;

    const { value } = element;
    Object.assign(state, { [elementName]: value });
    console.log("form", state);
  },

  submit: (event: Event, self: Block) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const formIsValid = ValidateForm.validateSubmit(form);
    // Object.values(self.children).forEach((element) => {
    //   element.setProps({ value: "", error: "" });
    // });

    console.log("formSubmitted", formIsValid);
  },
};
