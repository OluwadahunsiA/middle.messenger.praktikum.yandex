import Handlebars from 'handlebars';

Handlebars.registerPartial('profile', 'user-information/userinformation');

Handlebars.registerHelper('if', function (value) {
  if (value) {
    return value;
  } else {
    return;
  }
});
