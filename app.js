//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const homeStartingContent = "WELCOME TO BLOGSPACE!! A place for free speech where users can write and express their thoughts and feelings.";
const aboutContent = "A website made with love by Akhil Raj.";
const contactContent = "For more information, email me: akhilraaaj7@gmail.com";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

let posts = [];

app.get("/", function(req, res)
{
  res.render("home", {startingContent: homeStartingContent, posts: posts});
});

app.get("/about", function(req, res)
{
  res.render("about", {aboutContent: aboutContent});
});

app.get("/contact", function(req, res)
{
  res.render("contact", {contactContent: contactContent});
});

app.get("/compose", function(req, res)
{
  res.render("compose");
});

app.post("/compose", function(req, res)
{
  const post = {
    title: req.body.postTitle,
    content: req.body.postBody
  };
  posts.push(post);
  res.redirect("/");
});

app.get("/posts/:postName", function(req, res)
{
  const requestedTitle = _.lowerCase(req.params.postName); //lodash to avoid typecasing
  for(var i=0; i<posts.length; i++)
  {
    const storedTitle = _.lowerCase(posts[i].title);
    if(storedTitle === requestedTitle)
    {
      res.render("post", {title: posts[i].title, content: posts[i].content});
    }
  }
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
