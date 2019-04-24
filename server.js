const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

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

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'You must provide an address!'
    });
  }

  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }

      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }

        // res.send({
        //   forecast: forecastData,
        //   location,
        //   address: req.query.address
        // });
      });
    }
  );
});

// Setup static directory to serve
app.use(express.static(__dirname + '/views'));

// error routing
app.use('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/views/error.html'));
});

app.listen(3000, () => {
  console.log('Server is up on port 3000.');
});
