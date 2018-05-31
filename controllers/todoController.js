const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Connect to database (MongoDB via mLab)
mongoose.connect('mongodb://<test>:<password1>@ds157571.mlab.com:57571/node-todo');

// Schema
const todoSchema = new mongoose.Schema({
  item: String
});

const Todo = mongoose.model('Todo', todoSchema);
var itemOne = Todo({item: 'draw cats'}).save((err) => {
  if (err) throw err;
  console.log('item saved');
})

const data = [{item: 'groceries'}, {item: 'play with the cat'}, {item:'exercise'}];
const urlencodedParser = bodyParser.urlencoded({extended: false});

module.exports = function(app) {
  app.get("/todo", (req, res) => {
    res.render('todo', {todos: data});
  });

  app.post("/todo", urlencodedParser, (req, res) => {
    // add data items to array
    data.push(req.body);
    res.json(data);

  });

  app.delete("/todo/:item", (req, res) => {
    data = data.filter((todo) => {
      return todo.item.replace(/ /g, '-') !== req.params.item;
    });
    res.json(data);
  });
};
