const request = require("request");
// Trello
const Trello = require("trello");
// brandonratzloff api keys
const trello = new Trello(
  "1b6241ff3ff159ba82c4d0c40a232eae",
  "07b0ed0cbbbf555f08ca82d9fcf847e7f45785f893534d78c7e3b3a0a1ce98ac"
);

var options = {
  method: "GET",
  url: "https://api.trello.com/1/boards/xdo42f54",
  qs: {
    key: "1b6241ff3ff159ba82c4d0c40a232eae",
    token: "07b0ed0cbbbf555f08ca82d9fcf847e7f45785f893534d78c7e3b3a0a1ce98ac"
  }
};

// request(options, function(error, response, body) {
//   if (error) throw new Error(error);

//   board = JSON.parse(body);

//   console.log(board.name);
// });

// request(options, (error, response, body) => {
//   if (error) throw new Error(error);

//   console.log(body);
// });

trello.getCardsOnBoard("xdo42f54").then(response => {
  // console.log(cards);
  let cards = [];
  response.forEach((card, i) => {
    console.log(i + 1, cards);
    // console.log("Card:", card);
    // card.labels.forEach(label => {
    //   console.log(label.name);
    // });
    cards.push({ name: card.name, id: card.id });
  });

  // return res.send(cardNames);
  // return res.render("card-names", { cardNames: cardNames });
  // console.log({ cardNames: cardNames });
});
