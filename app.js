const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
if (process.env.ENV === 'Test') {
  console.log('Creating test db connection...');
  const db = mongoose.connect('mongodb://localhost:27017/booksapi_test', { useNewUrlParser: true, useUnifiedTopology: true });
} else {
  console.log('Creating production db connection...');
  const db = mongoose.connect('mongodb://localhost:27017/booksapi_prod', { useNewUrlParser: true, useUnifiedTopology: true });
}

const port = process.env.PORT || 3000;
const Book = require('./models/bookModel');
const bookRouter = require('./routes/bookRouter')(Book);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api', bookRouter);

app.get('/', (req, res) => {
  res.send('Welcome to my API!');
});

app.server = app.listen(port, () => {
  console.log(`Running on port ${port}`);
});

module.exports = app;
