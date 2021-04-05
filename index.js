const express = require("express");
const app = express(); 
const path = require("path");
const PORT = process.env.PORT || 5000;

app
  .use(express.static(path.join(__dirname, 'public')))
  .use(express.urlencoded({extended: true}))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
  })
  .post("/login", async (req, res) => {
    const username = (req.query.username) ? req.query.username : "";
    const password = (req.query.password) ? req.query.password : "";
    if (validateLogin(username, password)) {
      if(username=="admin" && password =="pass"){
        //actually need to connect to database which I would build afterward.
        let user_info = {username: username, password: password};
        console.log(username + "successfully login");
        res.render('pages/todo', user_info);
      }
      else{
        console.log("username or password wrong");
        res.redirect("/login");
      }
    }
    else{
      console.log("not valid username or password");
      res.redirect("/login");
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