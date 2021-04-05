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
    const username = req.body.username;
    const password = req.body.password;
    console.log(username + " " +password);
    if (validateLogin(username, password)) {
      if(username=="admin" && password =="pass"){
        //actually need to connect to database which I would build afterward.
        let user_info = {username: username, password: password};
        console.log(username + "successfully login");
        res.render('pages/profile_conf', user_info);
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
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));


function validateLogin(username, password) {
    let valid = false;
    if (username.length != 0 && password.length != 0){
        valid = true;
    }
    return valid;
}