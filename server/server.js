const { writeFile, readFile } = require("fs");
const { join } = require("path");

let filePath = join(__dirname, "chirps.json");

let chirps = [
  { author: "Charles", body: "Lets eat." },
  { author: "Marie", body: "What should I make?" },
  { author: "Racheal", body: "I cooked yesterday." },
  { author: "Dawanna", body: "I never get a chance to cook." },
  { author: "Seth", body: "I don't want to cook." },
];

writeFile(filePath, JSON.stringify(chirps), (err) => {
  if (err) return console.error(err);

  console.log("Wrote chirps.");
});

readFile("chirps.JSON", function(err, data) {
    if (err) {
        return console.error(err);
    }
    console.log(JSON.parse(data));
});
