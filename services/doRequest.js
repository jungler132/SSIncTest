import axios from 'axios';

export const doRequest = async (lat, lon, API_KEY) => {
  console.log('lat -->', lat);
  console.log('lon -->', lon);
  console.log('API_KEY -->', API_KEY);

  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`,
    );
    // const response = await axios.get('https://httpbin.org/get');
    console.log('responce --->', response);
    return response;
  } catch (e) {
    console.log('ERROR WITH GETTING DATA ---->', e);
  }
};
// http://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid={API key}
