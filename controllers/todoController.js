var bodyParser = require('body-parser');
var mongoose = require('mongoose');

//Connect to db
mongoose.connect('mongodb://test:test@ds151232.mlab.com:51232/todo')

//Create schema
var todoSchema = new mongoose.Schema({
  item: String
});

var Todo = mongoose.model('Todo', todoSchema);

var urlencodedParser = bodyParser.urlencoded({extended: false});

module.exports = function(app){

  app.get('/todo', function(req, res){
    //get data from db
    Todo.find({}, function(err, data){
      if(err) throw err;
      res.render('todo', {todos: data});
    })
  });

  app.post('/todo', urlencodedParser, function(req, res){
    //get data and add to db
    var newTodo = Todo(req.body).save(function(err, data){
      if(err) throw err;
      //res.render('todo', {todos: data});
      res.json(data);
    });
  });

  app.delete('/todo/:item', function(req, res){
    //delete from db
    Todo.find({item: req.params.item.replace(/\-/g," ")}).remove(function(err, data){
        if(err) throw err;
        res.json(data);
    })
  });
}
