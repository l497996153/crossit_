const express = require("express");
const app = express(); 
const path = require("path");
const PORT = process.env.PORT || 5000;
const { Client } = require("pg");
const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

app
  .use(express.static(path.join(__dirname, 'public')))
  .use(express.urlencoded({extended: true}))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
  })
  .post("/login", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    if (validateLogin(username, password)) {
      try {
        client.connect()
        client.query("SELECT * FROM users WHERE username = '" + username + "' AND password = '"+password+"';", function (err, result) {
          if (err) throw err;
          if(result.length != 0){
            let user_info = {username: result[0].username, password: result[0].password};
            console.log(result[0].username + "successfully login");
            res.render('pages/todo', user_info);
            connection.end();
          }
          else{
            let error = {error: "username or password wrong"};
            console.log('username or password wrong');
            res.render('pages/login_fail',error);
            connection.end();
          }
        });
      } catch (err) {
        console.error(err);
        res.send("Error " + err);
      }
      /*if(username=="admin" && password =="pass"){
        //actually need to connect to database which I would build afterward.
        let user_info = {username: username, password: password};
        console.log(username + "successfully login");
        res.render('pages/todo', user_info);
      }
      else{
        let error = {error: "username or password wrong"};
        console.log("username or password wrong");
        res.render('pages/login_fail',error);
      }*/
    }
    else{
      let error = {error: "not valid username or password"};
      console.log("not valid username or password");
      res.render('pages/login_fail',error);
    }
  })
  .post("/signUp", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    if (validateLogin(username, password)) {
      try {
        client.connect();
        client.query("SELECT username FROM users WHERE username = '" + username + "';", function (err, result) {
          if (err) throw err;
          if(result.length != 0){
            client.query("INSERT INTO users (username, password) VALUES ('"+username+"','"+password+"');", function (err) {
              if (err) throw err;
              console.log("user sign up");
            });
            let user_info = {username: username, password: password};
            res.render('pages/todo', user_info);
            connection.end();
          }
          else{
            let error = {error: "username is used"};
            console.log("username is used");
            res.render('pages/signup_fail',error);
            connection.end();
          }
        });
      } catch (err) {
        console.error(err);
        res.send("Error " + err);
      }
      /*if(username!="admin"){
        //actually need to connect to database which I would build afterward.
        let user_info = {username: username, password: password};
        console.log(username + "successfully sign up");
        res.render('pages/todo', user_info);
      }
      else{
        let error = {error: "username is used"};
        console.log("username is used");
        res.render('pages/signup_fail',error);
      }*/
    }
    else{
      let error = {error: "not valid username or password"};
      console.log("not valid username or password");
      res.render('pages/signup_fail',error);
    }
  })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));


function validateLogin(username, password) {
    let valid = false;
    if (username.length != 0 && password.length != 0){
        valid = true;
    }
    return valid;
}