import template from "./EditablePictureTemplate";
import Block from "../../core/Block";
import UserProfileController from "../../controllers/userProfileController";
import { PropsType } from "../../types";
import Button from "../ButtonComponent";

export default class EditablePicture extends Block {
  constructor(props: PropsType) {
    const button = new Button({
      name: "Save Picture",
      type: "submit",
    });
    super({
      ...props,
      button,
      events: {
        change: (event: Event) => {
          const pictureFile = event.target as HTMLInputElement;
          const { files } = pictureFile;

          if (files) {
            const fileReader = new FileReader();

            fileReader.readAsDataURL(files[0]);

            fileReader.onload = function onload() {
              const image = pictureFile.previousElementSibling;

              image!.setAttribute("src", fileReader.result as string);

              fileReader.onerror = function onerror() {
                console.log(fileReader.error);
              };
            };
          } else {
            return;
          }
        },

        submit: (event: Event) => {
          event.preventDefault();
          const form = event.target as HTMLFormElement;
          const data = new FormData(form);
          UserProfileController.editAvatar(data);
        },
      },
    });
  }

  render() {
    return this.compile(template);
  }
}
