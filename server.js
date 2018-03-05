var fs = require('fs');
var path = require('path');
var express = require('express');
var exphbs = require('express-handlebars');
var app = express();
// var usersData = require('./users-data');
var port = process.env.PORT || 3001;


app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) 
{
  console.log("== Got request for", req.url);
  res.render('index-page', 
  {
    title: "Welcome"
    // userData: usersData
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
  res.status(200).send("You tried to create a user successfully");  

});

app.post('/_loginGetResult', function (req, res)
{
  console.log("== Got POST request for", req.url);
  res.status(200).send("tried to log in successfully");  

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
