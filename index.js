const express = require("express");
const app = express(); 
const path = require("path");
const PORT = process.env.PORT || 5000;

app
  .use(express.static(path.join(__dirname, 'public')))
  .use(express.static(path.join(__dirname, 'JS')))
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
        res.render('pages/profile_conf');
      }
      else{
        return res.sendStatus(400);
      }
    }
    else{
      return res.sendStatus(400);
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