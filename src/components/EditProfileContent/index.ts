import template from './EditProfileContentTemplate';
import Block from '../../core/Block';
import Button from '../ButtonComponent';
import { formEvents } from '../../core/formEvents';



export default class EditProfileContent extends Block {
  constructor() {

     const button = new Button({
       type: "submit",
       name: "Save Changes",
     });
    super({
      button,
      events: {
        submit: (event: Event) => formEvents.submit(event),
      },
    });
  }

  render() {
    return this.compile(template);
  }
}

