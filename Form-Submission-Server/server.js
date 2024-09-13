const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');

const app = express();
const port = 8000;

app.use(bodyParser.urlencoded({ extended: true }));

app.post('/submit', (req, res) => {
  const email = req.body.email;

  // Append email to a file
  fs.appendFile('emails.txt', email + '\n', (err) => {
    if (err) throw err;
    console.log('Email saved!');
  });

  res.send('Email received');
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
