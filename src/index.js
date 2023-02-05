import Handlebars from 'handlebars';

Handlebars.registerPartial();

Handlebars.registerHelper('if', function (value) {
  if (value) {
    return value;
  } else {
    return;
  }
});
