require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

// Setup static directory to serve
app.use('/public', express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/templates/views/index.html'));
});

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'Please enter a city or location.'
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

        res.send({
          forecast: forecastData,
          currentTemperature: forecastData.currentTemperature,
          currentSummary: forecastData.currentSummary,
          hourlySummary: forecastData.hourlySummary,
          currentPrecip: forecastData.currentPrecip,
          feelsLike: forecastData.feelsLike,
          temperatureLow: forecastData.temperatureLow,
          temperatureHigh: forecastData.temperatureHigh,
          currentlyIcon: forecastData.currentlyIcon,
          location,
          address: req.query.address,
          latitude,
          longitude,
          mapboxToken: process.env.MAPBOX_API_TOKEN
        });
      });
    }
  );
});

// error routing
app.use('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'templates/views/error.html'));
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
