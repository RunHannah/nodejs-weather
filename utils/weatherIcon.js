const weatherIcon = () => {
  if (currentlyIcon === 'clear-day') {
    return <i class="fas fa-sun" />;
  }
  if (currentlyIcon === 'clear-night') {
    return <i class="fas fa-moon" />;
  }
  if (currentlyIcon === 'rain') {
    return <i class="fas fa-cloud-showers-heavy" />;
  }
  if (currentlyIcon === 'snow') {
    return <i class="fas fa-snowflake" />;
  }
  if (currentlyIcon === 'sleet') {
    return <i class="fas fa-icicles" />;
  }
  if (currentlyIcon === 'wind') {
    return <i class="fas fa-wind" />;
  }
  if (currentlyIcon === 'fog') {
    return <i class="fas fa-cloud" />;
  }
  if (currentlyIcon === 'cloudy') {
    return <i class="fas fa-cloud" />;
  }
  if (currentlyIcon === 'partly-cloudy-day') {
    return <i class="fas fa-cloud-sun" />;
  }
  if (currentlyIcon === 'partly-cloudy-night') {
    return <i class="fas fa-cloud-moon" />;
  }
};
