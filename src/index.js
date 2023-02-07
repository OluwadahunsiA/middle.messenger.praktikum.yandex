import Handlebars from 'handlebars';

Handlebars.registerHelper('if', function (value) {
  if (value) {
    return value;
  } else {
    return;
  }
});
