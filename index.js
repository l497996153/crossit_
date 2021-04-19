const express = require("express");
const app = express(); 
const path = require("path");
const PORT = process.env.PORT || 5000;
const {Pool} = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true
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
      if(username=="admin" && password =="pass"){
        //actually need to connect to database which I would build afterward.
        let user_info = {username: username, password: password};
        console.log(username + "successfully login");
        res.render('pages/todo', user_info);
      }
      else{
        let error = {error: "username or password wrong"};
        console.log("username or password wrong");
        res.render('pages/login_fail',error);
      }
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
      if(username!="admin"){
        //actually need to connect to database which I would build afterward.
        let user_info = {username: username, password: password};
        console.log(username + "successfully sign up");
        res.render('pages/todo', user_info);
      }
      else{
        let error = {error: "username is used"};
        console.log("username is used");
        res.render('pages/signup_fail',error);
      }
    }
    else{
      let error = {error: "not valid username or password"};
      console.log("not valid username or password");
      res.render('pages/signup_fail',error);
    }
  })
  .get('/db', async(req, res) => {
    try {
      const client = await pool.connect()
      client.query("CREATE TABLE IF NOT EXISTS Users (id INT NOT NULL UNIQUE," + 
                                                     "username VARCHAR(15) NOT NULL,"+
                                                     "password VARCHAR(15) NOT NULL," +
                                                     "PRIMARY KEY(id));")
      client.query("INSERT INTO Users VALUES (1,'b','a');");
      const result = await client.query('SELECT * FROM Users');
      res.send(result.rows[0].name)
    } catch (err) {
      console.error(err);
      res.send("Error " + err);
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