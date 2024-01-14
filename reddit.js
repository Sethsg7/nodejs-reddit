const { writeFile, mkdirSync, existsSync } = require("fs");
const { join, extname } = require("path");
const fetch = require("isomorphic-fetch");

let filePath = join(__dirname, "popular-articles.json");

fetch("https://reddit.com/r/programmingHumor.json")
  .then((res) => res.json())
  .then(({ data: { children } }) => {
    console.log(children);

    let articles = [];

    //Loop to place specific article info into array.
    for (let article of children) {
      articles.push({
        url: article.data.url,
        title: article.data.title,
        author: article.data.author,
      });
    }
    writeFile(filePath, JSON.stringify(articles), (err) => {
        if(err) return console.error(err);

        console.log("Retrieved articles.")
    })
  })
  .catch((err) => console.error(err));
