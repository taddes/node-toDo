const bodyParser = require('body-parser');

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
