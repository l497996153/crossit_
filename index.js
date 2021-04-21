const express = require("express");
const app = express(); 
const path = require("path");
const PORT = process.env.PORT || 5000;
const { Pool } = require("pg");
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});
pool.connect();

app
  .use(express.static(path.join(__dirname, 'public')))
  .use(express.urlencoded({extended: true}))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
  })
  .get('/api/todos/:id', function(req, res) {
    pool.query("SELECT * FROM todos WHERE user_id = '" + req.params.id + "';", function (err, result) {
      if (err) throw err;
      res.json(result.rows);
    });
  })
  .post('/api/todos', function(req, res) {
    const todo = req.body;
    pool.query("INSERT INTO todos (title, user_id) VALUES ('"+todo.title+"','"+todo.id+"');", function (err, result) {
      if (err) throw err;
      res.sendStatus(201);
    });
  })
  .delete('/api/todos', function(req, res) {
    pool.query("DELETE FROM todos WHERE title = '"+todo.title+"' AND user_id='"+todo.id+"';", function (err, result) {
      if (err) throw err;
      res.sendStatus(204);
    });
    /*else{
      res.sendStatus(404);
    }*/
  })
  .post("/login", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    if (validateLogin(username, password)) {
      try {
        pool.query("SELECT * FROM users WHERE username = '" + username + "' AND password = '"+password+"';", function (err, result) {
          if (err) throw err;
          if(result.length != 0){
            let user_info = {username: result.rows[0].username, password: result.rows[0].password};
            console.log(result.rows[0].username + " successfully login");
            res.render('pages/todo', user_info);
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
      try {
        const result = () => pool.query("SELECT username FROM users WHERE username = '" + username + "';", function (err) {
          if (err) throw err;
          if(result.length != 0){
            return true;
          }
        });
        if(result){
          await pool.query("INSERT INTO users (username, password) VALUES ('"+username+"','"+password+"');");
          let user_info = {username: username, password: password};
          res.render('pages/todo', user_info);
        }
        else{
          let error = {error: "username is used"};
          console.log("username is used");
          res.render('pages/signup_fail',error);
        }
      } catch (err) {
        console.error(err);
        res.send("Error " + err);
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