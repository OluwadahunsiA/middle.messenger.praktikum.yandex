// eslint-disable-next-line @typescript-eslint/no-var-requires
const express = require("express");
const app = express();
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require("path");
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Port ${PORT} is listening`);
});
