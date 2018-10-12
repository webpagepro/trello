const express = require("express");
const app = express();

app.get("/", (req, res) => res.send("Hello World!"));

app.get("/path-two", function(req, res) {
  res.redirect("/");
});

app.listen(3001, () => console.log("Example app listening on port 3000!"));
