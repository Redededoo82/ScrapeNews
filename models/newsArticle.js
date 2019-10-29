var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ArticleSchema = new Schema({

});

var NewsArticle = mongoose.model("newsArticle", ArticleSchema);
module.exports = NewsArticle;
