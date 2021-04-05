const express = require("express");
const app = express(); 
const path = require("path");
const PORT = process.env.PORT || 5000;

app
  .use(express.static(path.join(__dirname, 'public')))
  .use(express.static(path.join(__dirname, 'JS')))
  .use(express.urlencoded({extended: true}))
  .set('views', path.join(__dirname, 'views'))
  .post("/login", async (req, res) => {
    const username = (req.query.username) ? req.query.username : "";
    const password = (req.query.password) ? req.query.password : "";
    if (validateLogin(username, password)) {
      res.render('public/profile_conf');
    }
    else{
      res.render('public/index');
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