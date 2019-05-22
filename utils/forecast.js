require('dotenv').config();
const request = require('request');
const weatherIcon = require('./weatherIcon');

const forecast = (latitude, longitude, callback) => {
  const url =
    'https://api.darksky.net/forecast/' +
    process.env.DARKSKY_API_KEY +
    '/' +
    latitude +
    ',' +
    longitude;

  request({ url, json: true }, (error, { body }) => {
    let weatherHtml = weatherIcon(body.currently.icon);

    if (error) {
      callback('Unable to connect to weather service!', undefined);
    } else if (body.error) {
      callback('Unable to find location', undefined);
    } else {
      callback(undefined, {
        currentTemperature: body.currently.temperature,
        currentSummary: body.currently.summary,
        minutelySummary: body.minutely.summary,
        currentPrecip: body.currently.precipProbability,
        feelsLike: body.hourly.data[0].apparentTemperature,
        temperatureLow: body.daily.data[0].temperatureLow,
        temperatureHigh: body.daily.data[0].temperatureHigh,
        currentlyIcon: weatherHtml
      });
    }
  });
};

module.exports = forecast;
