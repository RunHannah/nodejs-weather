const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const currentTemp = document.querySelector('#current-temp');
const currentSummary = document.querySelector('#current-summary');

weatherForm.addEventListener('submit', e => {
  e.preventDefault();

  const location = search.value;
  let map = '';
  currentTemp.textContent = 'Loading...';
  currentSummary.textContent = '';

  fetch('http://localhost:3000/weather?address=' + location).then(response => {
    response.json().then(data => {
      if (data.error) {
        currentTemp.textContent = data.error;
      } else {
        console.log('data', data);

        console.log('forecastdata', data.forecast);

        currentTemp.textContent = data.currentTemperature;
        currentSummary.textContent = data.currentSummary;
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
