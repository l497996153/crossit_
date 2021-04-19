const express = require("express");
const app = express(); 
const path = require("path");
const PORT = process.env.PORT || 5000;
const {Pool} = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
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
      log("true");
      /*try {
        const client = await pool.connect()
        client.query("CREATE TABLE IF NOT EXISTS Users (id INT NOT NULL UNIQUE," + 
                                                       "username VARCHAR(15) NOT NULL UNIQUE,"+
                                                       "password VARCHAR(15) NOT NULL," +
                                                       "PRIMARY KEY(id));")
        client.query('SELECT * FROM Users WHERE username = ' + username + ';', function (err, result) {
          if (err) throw err;
          if(!result.length){
            if(password == result.rows[0].password){
              let user_info = {username: username, password: password};
              console.log(username + "successfully login");
              res.render('pages/todo', user_info);
            }else{
              let error = {error: 'username or password wrong'};
              console.log("username or password wrong");
              res.render('pages/login_fail',error);
            }
          }
          else{
            let error = {error: "username or password wrong"};
            console.log('username or password wrong');
            res.render('pages/login_fail',error);
          }
        });
      } catch (err) {
        console.error(err);
        res.send("Error " + err);
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
        const client = await pool.connect()
        client.query("CREATE TABLE IF NOT EXISTS Users (id INT NOT NULL UNIQUE AUTO_INCREMENT," + 
                                                       "username VARCHAR(15) NOT NULL UNIQUE,"+
                                                       "password VARCHAR(15) NOT NULL," +
                                                       "PRIMARY KEY(id));")
        client.query('SELECT username FROM Users WHERE username = ' + username + ';', function (err, result) {
          if (err) throw err;
          if(!result.length){
            /*client.query("INSERT INTO Users (username, password) VALUES ('"+username+"','"+password+"');", function (err, result) {
              if (err) throw err;
              console.log("user sign up");
            });*/
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
        res.send(err);
      }
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