const fs = require('fs');
const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');
const app = express();
const mysql = require('mysql');
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;
const store = require('./store');
// var usersData = require('./users-data');

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars');

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "askie",
  port: 3001
});

con.connect();

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

/*app.post('/_newUserInsert', function (req, res)
{
  console.log("== Got POST request for", req.url);
  res.status(200).send("You tried to create a user successfully, (Press Back)");  

});*/

app.post('/createUser', (req, res) => {
  store
    .createUser({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      username: req.body.username,
      password: req.body.password
    })
    .then( () => res.sendStatus(200))
});

/*app.post('/_loginGetResult', function (req, res)
{
  console.log("== Got POST request for", req.url);
  res.status(200).send("tried to log in successfully, (Press Back)");  

});*/

app.post('/login', (req, res) => {
  store
    .authenticateUser({
      username: req.body.username,
      password: req.body.password
    })
    .then(({ success }) => {
      if(success) res.sendStatus(200);
      else res.sendStatus(401);
    })
});

/*app.post('/_createGetResult', function (req, res)
{
  console.log("== Got POST request for", req.url);
  res.status(200).send("tried to create a forum successfully, (Press Back)");  

});*/

app.post('/createForum', (req, res) => {
  store
    .createForum({
      forumName: req.body.forumName,
      className: req.body.className,
      classCode: req.body.classCode,
      classLocation: req.body.classLocation
    })
    .then( () => res.sendStatus(200));
});

/*app.post('/_joinGetResult', function (req, res)
{
  console.log("== Got POST request for", req.url);
  res.status(200).send("tried to join a forum successfully, (Press Back)");
});*/

app.post('/joinForum', (req, res) => {
  store
    .authenticateForum({
      passcode: req.body.passcode
    })
    .then(({ success }) => {
      if(success) res.sendStatus(200);
      else res.sendStatus(401);
    })
});

app.post('/postQuestion', (req, res) => {
  store
    .postQuestion({
      title: req.body.title,
      body: req.body.body,
      anonymous: req.body.anonymous,
      urgency: req.body.urgency
    })
    .then( () => res.sendStatus(200));
});

app.post('/postAnswer', (req, res) => {
  store
    .postAnswer({
      body: req.body.body,
      anonymous: req.body.anonymous
    })
    .then( () => res.sendStatus(200));
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
}

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
});*/