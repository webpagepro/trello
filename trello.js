// Trello
const Trello = require("trello");
// api keys
const trello = new Trello(
  "1b6241ff3ff159ba82c4d0c40a232eae",
  "07b0ed0cbbbf555f08ca82d9fcf847e7f45785f893534d78c7e3b3a0a1ce98ac"
);

// https://www.youtube.com/watch?v=V9JyBCTcDsg
const express = require("express");
const pug = require("pug");
const bodyParser = require("body-parser");

//const app = express();

// middleware / routing
//app.set("view engine", "pug");
//app.use(bodyParser.urlencoded({ extended: true }));

// Root
app.get("/", (req, res) => {
  // return res.redirect("/form-with-get");
  return res.render("form-choices");
});

// Form: Get Cards from Board
app.get("/get-cards", (req, res) => {
  return res.render("get-cards");
});

// Results
app.get("/get-cards-results", (req, res) => {
  // return res.send(req.query.boardId);
  let cards = {};
  let cardNames = [];
  trello.getCardsOnBoard(req.query.boardId).then(cards => {
    // console.log(cards);
    cards.forEach((v, i) => {
      // console.log("Card:", v);
      // console.log("Name:", v.name);
      cardNames.push(v.name);
    });
    // return res.send(cardNames);
    return res.render("card-names", { cardNames: cardNames });
  });
  // return trello.getCardsOnBoard(req.query.boardId);
});

// Form: Add Card - Issue
app.get("/add-card-issue", (req, res) => {
  return res.render("add-card-issue");
});

// Results
app.get("/add-card-issue-result", (req, res) => {
  let description = "";
  // description = req.query.description + "\n\r" + req.query.acroynm;
  description = `**Description**: ${req.query.description} **Acronym:** ${
    req.query.acronym
  }`;
  if (req.query.Done === "Submit") {
    trello
      .addCard(req.query.name, description, "5b994ae7b554bc05083e889a")
      .then(card => {
        return res.send(`Card Created... ${req.query.name}`);
      });
  }
  // return res.send(description);
});

app.get("/form-with-post", (req, res) => {
  return res.render("form-with-post");
});

// create server
app.listen(3000, function() {
  console.log("Server running on port 3000.");
});

// Submit w/ Post
app.post("/submit-form-with-post", (req, res) => {
  return res.send(req.query);
});

// trello.getBoards("brandonratzloff").then(res => {
//   console.log(res);
// });

// cardsOnBoard = trello.getCardsOnBoard(boardId).then(res => {
//   console.log(res);
// });

trello.getListsOnBoard("b3ZXOuj6").then(lists => {
  console.log(lists);
});
