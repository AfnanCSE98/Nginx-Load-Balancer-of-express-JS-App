const express = require('express');
const path = require('path');
var http = require('http');
const app = express();
const port = process.env.PORT || process.argv[2];

//database setup
const db = require('./db.js');

app.set('views' , path.join(__dirname , 'views'));
app.set('view engine' , 'pug');
app.use(express.json());

app.get('/', db.show_tags);
app.get('/tag/:id' , db.get_quote_by_id);

app.listen(port);
console.log('Server started at http://localhost:' + port);
