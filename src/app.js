const express = require("express");
const path = require("path");
const hbs = require("hbs");
const utils = require("./utils");
const PORT = 3000;
const app = express();

console.log(__dirname);

const public = path.join(__dirname + "/../public");
const viewDir = path.join(__dirname + "/../template/views");
const partialsDir = path.join(__dirname + "/../template/partials");
console.log(viewDir);

//setup handlebar(dynamic content) and views location
app.set("view engine", "hbs");
app.set("views", viewDir);
hbs.registerPartials(partialsDir);

app.get("", (req, res) => {
  res.render("index", {
    title: "Home",
    name: "Mike Tyson",
  });
});
app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "Mike Tyson",
    call: "1234567890",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help Section",
    message: "This section is to help other",
  });
});

app.use(express.static(public));

app.get("", (req, res) => {
  res.send("Hello World in Expres");
});
// app.get("/about", (req, res) => {
//   res.send("About website");
// });
app.get("/weather", (req, res) => {
  if (req.query.address) {
    return utils.getLocation(req.query.address, (data) => {
      res.send({
        ...data,
      });
    });
  }

  res.send({
    error: "Please give a address",
  });
});
// app.get("/help", (req, res) => {
//   res.send([
//     { name: "MAk", age: 24 },
//     { name: "Sarah", age: 32 },
//   ]);
// });

app.get("/product", (req, res) => {
  console.log(req.query);
  res.send({
    product: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "Not Found",
    message: "Article not found",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "Not Found",
    message: "Page not found",
  });
});
app.listen(PORT, () => {
  console.log("Server started on ", PORT);
});
