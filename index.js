const express = require('express');

const app = express();

app.listen(3000, () => {
  console.log('Server is up on port 3000.');
});

app.get('', (req, res) => {
  res.send('This is the main page.');
});
