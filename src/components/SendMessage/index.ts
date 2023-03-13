import Block from "../../core/Block";
import template from "./SendMessageTemplate";

import MessageInput from "../../components/MessageInputComponent";
// import { formEvents } from "../../core/formEvents";
import Button from "../ButtonComponent";
import MessageService from "../../services/messageService";
import ValidateForm from "../../core/ValidateForms";

export default class SendMessage extends Block {
  constructor(props: { [key: string]: string }) {
    const messageInput = new MessageInput({
      name: "message",
      id: "message",
      placeholder: "message",
    });
    const button = new Button({
      type: "submit",
      name: "send",
    });

    super({
      ...props,
      messageInput,
      button,
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
