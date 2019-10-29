var dotenv = require("dotenv");
var express = require("express");
var axios = require("axios");
var cheerio = require("cheerio");
var mongoose = require("mongoose");
var exhbs = require("express-handlebars");
var logger = require("morgan");
var databaseUrl = "scraper";
var collections = ["scrapedData"];
var db = require("./models");
var PORT = 8080;
var app = express();
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/exampledb";
mongoose.connect(MONGODB_URI);

app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

//get route for scraping website//
app.get("/scrape", function(req, res) {
    axios.get("http://www.blahblahblah.com/").then(function(response) {
        var $ = cheerio.load(response.data);

        //grabbing element from body of website
        $("article h2").each(function(i, element) {
            var result = {};
            result.title = $(this)
            .children("a")
            .text();
          result.link = $(this)
            .children("a")
            .attr("href");
            db.Article.create(result)
        .then(function(dbArticle) {
          // View the added result in the console
          console.log(dbArticle);
        })
        .catch(function(err) {
            console.log(err);
        });
    });
    res.send("Scrape Complete");
  });
});

app.listen(PORT, function() {
    console.log("App running on http://localhost:8080 "  + "!");
  });