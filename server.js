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
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://user420:password420@ds035836.mlab.com:35836/heroku_6x4z9rtz";
mongoose.connect(MONGODB_URI);

app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

//get route for scraping website//
app.get("/scrape", function(req, res) {
    axios.get("http://www.infowars.com/news").then(function(response) {
        var $ = cheerio.load(response.data);

        //grabbing element from body of website
        $("news h4").each(function(i, element) {
            var result = {};
            result.title = $(this)
            .children("a")
            .text();
          result.link = $(this)
            .children("a")
            .attr("href");
            db.NewsArticle.create(result)
        .then(function(dbNewsArticle) {
          // View the added result in the console
          console.log(dbNewsArticle);
        })
        .catch(function(err) {
            console.log(err);
        });
    });
    res.send("Scrape Complete lol");
  });
});

app.listen(PORT, function() {
    console.log("CONGRATULATIONS!")
    console.log("App running on http://localhost:8080 "  + "!");
  });