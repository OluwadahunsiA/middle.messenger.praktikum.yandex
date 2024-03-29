function validateInput(value: string | number, expression: RegExp) {
  const regularExpresssion = new RegExp(expression);

  if (!value) {
    return false;
  } else {
    return regularExpresssion.test(String(value));
  }
}

function CheckValidity(
  value: string | number,
  expression: RegExp,
  message: string
): string {
  const validEntry = validateInput(value, expression);

  if (!validEntry) {
    return message;
  } else {
    return "";
  }
}

export default class ValidateForm {
  static regularExpresssions = {
    login: /^(?!\d+$)[A-Za-z-_0-9]{3,20}$/,
    email: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
    password: /^(?=[^A-Z]*[A-Z])(?=\D*\d)[A-Za-z0-9!#%]{8,40}$/,
    name: /^[A-ZА-ЯЁ][а-яА-ЯёЁa-zA-Z-]+$/,
    phone: /^((?:.+)[0-9]{10,15})$/,
    message: /.+/,
  };

  static formValidationEntries: Record<string, (value: string) => string> = {
    login: (value: string) => ValidateForm.validateLogin(value),
    password: (value: string) => ValidateForm.validatePassword(value),
    newPassword: (value: string) => ValidateForm.validatePassword(value),
    confirmPassword: (value: string) => ValidateForm.validatePassword(value),
    oldPassword: (value: string) => ValidateForm.validatePassword(value),
    phone: (value: string) => ValidateForm.validatePhoneNumber(value),
    email: (value: string) => ValidateForm.validateEmail(value),
    message: (value: string) => ValidateForm.validateMessage(value),
    first_name: (value: string) => ValidateForm.validateName(value),
    second_name: (value: string) => ValidateForm.validateName(value),
    password_repeat: (value: string) => ValidateForm.validatePassword(value),
    newPasswordRepeat: (value: string) => ValidateForm.validatePassword(value),
    avatar: (value: string) => ValidateForm.validateName(value),
    search: (value: string) => ValidateForm.validateSearch(value),
  };

  static validateInput(value: string | number, expression: RegExp) {
    const regularExpresssion = new RegExp(expression);

    if (!value) {
      return false;
    } else {
      return regularExpresssion.test(String(value));
    }
  }

  static validateLogin(value: string) {
    const expression = ValidateForm.regularExpresssions.login;
    return CheckValidity(
      value,
      expression,
      "Must be 3-20 symbols. No special symbols except - and _"
    );
  }

  static validateEmail(value: string) {
    const expression = ValidateForm.regularExpresssions.email;
    return CheckValidity(value, expression, "Incorrect Email");
  }

  static validateName(value: string) {
    const expression = ValidateForm.regularExpresssions.name;

    return CheckValidity(
      value,
      expression,
      "First letter must be in uppercase. No special symbol is allowed."
    );
  }

  static validatePassword(value: string) {
    const expression = ValidateForm.regularExpresssions.password;

    return CheckValidity(
      value,
      expression,
      "Password must be 8-40 symbols long. Must contain one uppercase and one numerical value "
    );
  }

  static validateMessage(value: string) {
    const expression = ValidateForm.regularExpresssions.message;

    return CheckValidity(value, expression, "Empty message");
  }
  static validateSearch(value: string) {
    const expression = ValidateForm.regularExpresssions.message;

    return CheckValidity(value, expression, "Empty");
  }

  static validatePhoneNumber(value: string) {
    const expression = ValidateForm.regularExpresssions.phone;

    return CheckValidity(
      value,
      expression,
      "Incorrect phone number. Number can start with a +"
    );
  }

  static validateSubmit(form: HTMLFormElement) {
    const [...elements] = form;

    let valid = true;

    for (const element of elements) {
      if (element.nodeName === "INPUT") {
        //@ts-ignore
        const { error } = ValidateForm.verifyElement(element);

        if (error.length > 0) {
          valid = false;
        }
      }
    }

    return valid;
  }

  static verifyElement(element: HTMLInputElement): { [key: string]: string } {
    const { name, value } = element;

    const error = ValidateForm.formValidationEntries[name](value);

    return { value, error };
  }
}
