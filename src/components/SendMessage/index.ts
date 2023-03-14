import Block from "../../core/Block";
import template from "./SendMessageTemplate";
// import { formEvents } from "../../core/formEvents";
import MessageService from "../../services/messageService";
import ValidateForm from "../../core/ValidateForms";

export default class SendMessage extends Block {
  constructor(props: { [key: string]: string }) {
    super({
      ...props,
      events: {
        submit: (event: Event) => {
          event.preventDefault();

          const messageInput = event.target as HTMLFormElement;
          const messageInputElement = messageInput.querySelector(
            "#message"
          ) as HTMLInputElement;

          const messageInputName = messageInputElement.name as string;
          const validateForm = ValidateForm.validateSubmit(messageInput);

          const input = messageInput.elements[
            messageInputName as any
          ] as HTMLInputElement;

          const { error } = ValidateForm.verifyElement(input);

          if (validateForm) {
            MessageService.sendMessage(input.value);

            this.setProps({
              value: "",
              error: "",
            });
          } else {
            this.setProps({
              ...this.props,
              error,
            });
            // you can display a message here.
          }
        },
      },
    });
  }

  render() {
    return this.compile(template);
  }
}
