var express= require('express');

var app = express();
var todoController = require('./controllers/todoController');
//set up ejs
app.set('view engine', 'ejs');

//static files
app.use(express.static('./public'));

//fire controllers
todoController(app);

app.listen(3000);
console.log('You are listening to port 3000');
