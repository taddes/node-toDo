const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// EJS templating view engine
app.set('view engine', 'ejs');

// Static files
app.use(express.static('./public'));

//listen to port
app.listen(3000);
console.log('Listening to port number 3000');