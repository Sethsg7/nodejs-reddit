const { writeFile, mkdirSync, existsSync } = require("fs");
const { join, extname } = require("path");
const fetch = require("isomorphic-fetch");

let filePath = join(__dirname, "popular-articles.json");

fetch("https://reddit.com/r/programmingHumor.json")
  .then((res) => res.json())
  .then(({ data: { children } }) => {
    console.log(children);

    let imageExts = [".png", ".jpeg", ".jpg", ".gif", ".svg"];
    //let articles = [];

    for (let article of children) {
      if (imageExts.includes(extname(article.data.url))) {
        fetch(article.data.url)
          .then((res) => res.arrayBuffer())
          .then((data) => {
            if (!existsSync("./images")) {
              mkdirSync("./images");
            }
            writeFile(
              join(
                __dirname,
                "images",
                article.data.id + extname(article.data.url)
              ),
              Buffer.from(data),
              (err) => {
                if (err) {
                  console.error("Error writing to file.", err);
                }
                console.log("Downloaded image for " + article.data.title);
              }
            );
          });
      }
    }
  })
  .catch((err) => console.error(err));

//Loop to place specific article info into array.
// for (let article of children) {
//   articles.push({
//     url: article.data.url,
//     title: article.data.title,
//     author: article.data.author,
//   });
// }

// let chirps = [
//   { author: "Charles", body: "Lets eat." },
//   { author: "Marie", body: "What should I make?" },
//   { author: "Racheal", body: "I cooked yesterday." },
//   { author: "Dawanna", body: "I never get a chance to cook." },
//   { author: "Seth", body: "I don't want to cook." },
// ];
