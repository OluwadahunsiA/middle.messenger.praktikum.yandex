/* eslint-disable @typescript-eslint/no-var-requires */

const { JSDOM } = require("jsdom");
const Handlebars = require("handlebars");
const fs = require("fs");

const { window } = new JSDOM(
  '<!DOCTYPE html><html><body><div id="root"></div></body></html>',
  {
    url: "http://localhost:3000",
  }
);

global.window = window;
global.Node = window.Node;
global.localStorage = window.localStorage;
global.document = window.document;

require.extensions[".hbs"] = function (module, filename) {
  const content = fs.readFileSync(filename, "utf-8");
  module.exports = Handlebars.compile(content);
};

require.extensions[".scss"] = () => {
  module.exports = () => ({});
};

require.extensions[".avif"] = () => {
  module.exports = () => ({});
};

require.extensions[".svg"] = () => {
  module.exports = () => ({});
};
