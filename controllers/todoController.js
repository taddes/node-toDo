const bodyParser = require('body-parser');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
// Connect to database (MongoDB via mLab)
mongoose.connect('mongodb://test:password1@ds157571.mlab.com:57571/node-todo');

// Schema
const todoSchema = new mongoose.Schema({
  item: String
});

const Todo = mongoose.model('Todo', todoSchema);

const urlencodedParser = bodyParser.urlencoded({extended: false});

module.exports = function(app) {

  app.get("/todo", (req, res) => {
    // get data from Mongodb and pass it to view
      Todo.find({}, (err, data) => {
      if (err) throw err;
      res.render('todo', {todos: data});
    });
  });

  app.post("/todo", urlencodedParser, (req, res) => {
    // get data from view, add to Mongodb
    let newTodo = Todo(req.body).save((err, data) =>{
      if (err) throw err
      res.json(data);
    });
  });

  app.delete("/todo/:item", (req, res) => {
    // delete requested item from mongodb
    Todo.find({item: req.params.item.replace(/\-/g, " ")}).remove((err) => {
      if (err) throw err;
      res.json(data);
    });
  });
};
