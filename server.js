const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();

// app.get('', (req, res) => {
//   res.send({
//     title: 'Check the weather',
//     dateToday: new Date()
//   });
// });

// app.get('*', (req, res) => {
//   res.send({
//     title: '404',
//     errorMessage: 'Page not found.'
//   });
// });

router.get('/', (res, req) => {
  res.sendFile(path.join(__dirname, '/index.html'));
});

// Setup static directory to serve
app.use(express.static(__dirname + '/views'));

app.listen(3000, () => {
  console.log('Server is up on port 3000.');
});
