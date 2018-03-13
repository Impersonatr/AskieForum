var fs = require('fs');
var path = require('path');
var express = require('express');
var exphbs = require('express-handlebars');
var app = express();
var mysql = require('mysql');
// var usersData = require('./users-data');
var port = process.env.PORT || 3000;

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars');

app.use(express.static(path.join(__dirname, 'public')));

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "askie",
  port: 3001
});

con.connect();

/*function getUserData(callback){
  con.query("SELECT * FROM user", function(err, result){
    if(err) callback(err, null);
    else callback(null, result);
  });
}


return con.query("SELECT * FROM user", function selectAll(err, result, fields){
    if(err) throw err;
    for(var i in result)
      console.log(result[i]);
  });
}*/

con.query("SELECT * FROM user", function(err, result, fields){
  userData = result;
});

con.query("SELECT * FROM forum_user", function(err, result, fields){
  forumUserData = result;
});

con.query("SELECT * FROM forum_host", function(err, result, fields){
  forumHostData = result;
});

con.query("SELECT * FROM forum", function(err, result, fields){
  forumData = result;
});

con.query("SELECT * FROM forum_member", function(err, result, fields){
  forumMemberData = result;
});

con.query("SELECT * FROM session", function(err, result, fields){
  sessionData = result;
});

con.query("SELECT * FROM question", function(err, result, fields){
  questionData = result;
});

con.query("SELECT * FROM response", function(err, result, fields){
  responseData = result;
});

app.get('/', function (req, res) 
{
  console.log("== Got request for", req.url);
  res.render('index-page', 
  {
    title: "Welcome"
  });
});

app.get('/login', function (req, res)
{
  console.log("== Got request for", req.url);
  res.render('login-page',
  {
    title: "Login"
  });
});


app.get('/home', function (req, res)
{
  console.log("== Got request for", req.url);
  res.render('home-page', 
  {
    title: "Forum List"
  });
});

app.get('/about', function (req, res)
{
  console.log("== Got request for", req.url);
  res.render('about',
  {
    title: "About"
  });
});

app.get('/forum-list', function (req, res)
{
  console.log("== Got request for", req.url);
  res.render('forum-list',
  {
    title: "Forum List",
    forums: "forumData"
  });
})

app.get('/settings', function (req, res)
{
  console.log("== Got request for", req.url);
  res.render('user-settings', 
  {
    title: "Settings"
  });
});

app.get('/signup', function (req, res)
{
  console.log("== Got request for", req.url);
  res.render('signup-page', 
  {
    title: "Sign-Up"
  });
});

app.get('/member-forum', function (req, res)
{
  console.log("== Got request for", req.url);
  res.render('member-forum-page', 
  {
    title: "Forum"
  });
});

app.get('/host-forum', function (req, res)
{
  console.log("== Got request for", req.url);
  res.render('host-forum-page', 
  {
    title: "Forum"
  });
});

app.post('/_newUserInsert', function (req, res)
{
  console.log("== Got POST request for", req.url);
  res.status(200).send("You tried to create a user successfully, (Press Back)");  

});

app.post('/_loginGetResult', function (req, res)
{
  console.log("== Got POST request for", req.url);
  res.status(200).send("tried to log in successfully, (Press Back)");  

});

app.post('/_createGetResult', function (req, res)
{
  console.log("== Got POST request for", req.url);
  res.status(200).send("tried to create a forum successfully, (Press Back)");  

});

app.post('/_joinGetResult', function (req, res)
{
  console.log("== Got POST request for", req.url);
  res.status(200).send("tried to join a forum successfully, (Press Back)");  

});

app.get('*', function (req, res) 
{
  console.log("== Got request for", req.url);
  res.status(404).render('404-page',
  {
  	title: "Error 404"
  });
});

app.listen(port, function () {
  console.log("== Listening on port", port);
});

con.end();