import template from './EditProfileContentTemplate';
import Block from '../../core/Block';



export default class EditProfileContent extends Block {
  constructor() {
    super();
  }

  render() {
    return this.compile(template);
  }
}
