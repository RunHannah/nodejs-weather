const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const currently = document.querySelector('#currently');
const dailySummary = document.querySelector('#dailySummary');
const feelsLike = document.querySelector('#feels-like');

weatherForm.addEventListener('submit', e => {
  e.preventDefault();

  const location = search.value;
  let map = '';
  currently.textContent = 'Loading...';
  dailySummary.textContent = '';
  feelsLike.textContent = '';

  fetch('http://localhost:3000/weather?address=' + location).then(response => {
    response.json().then(data => {
      if (data.error) {
        currently.textContent = data.error;
      } else {
        currently.textContent =
          Math.round(data.currentTemperature) + '°' + ' ' + data.currentSummary;
        dailySummary.textContent = data.dailySummary;
        feelsLike.textContent =
          'Feels like: ' +
          Math.round(data.feelsLike) +
          '°' +
          ' ' +
          'Low: ' +
          Math.round(data.temperatureLow) +
          '°' +
          ' ' +
          'High: ' +
          Math.round(data.temperatureHigh) +
          '°';

        mapboxgl.accessToken = data.mapboxToken;
        map = new mapboxgl.Map({
          container: 'map', // container id
          style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
          center: [data.longitude, data.latitude], // starting position [lng, lat]
          zoom: 10 // starting zoom
        });
      }
    });
  });

  weatherForm.reset();
});
