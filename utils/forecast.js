require('dotenv').config();
const request = require('request');

const forecast = (latitude, longitude, callback) => {
  const url =
    'https://api.darksky.net/forecast/' +
    process.env.DARKSKY_API_KEY +
    '/' +
    latitude +
    ',' +
    longitude;

  request({ url, json: true }, (error, { body }) => {
    console.log('forecast body', body);

    // console.log('summary', body.daily.data);

    if (error) {
      callback('Unable to connect to weather service!', undefined);
    } else if (body.error) {
      callback('Unable to find location', undefined);
    } else {
      callback(undefined, {
        currentTemperature: body.currently.temperature,
        currentSummary: body.currently.summary,
        dailySummary: body.daily.data[0].summary,
        currentPrecip: body.currently.precipProbability
      });
    }
  });
};

module.exports = forecast;
