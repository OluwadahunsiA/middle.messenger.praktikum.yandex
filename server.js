// eslint-disable-next-line @typescript-eslint/no-var-requires
const express = require("express");
const app = express();
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require("path");
const port = 3000;

app.use(express.static(path.join(__dirname, "dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.listen(port, () => {
  console.log(`Port ${port} is listening`);
});
