import axios from 'axios';

export const doRequest = async (lat, lon, API_KEY) => {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`,
    );
    console.log('responce --->', response);
    return response.data;
  } catch (e) {
    console.log('ERROR WITH GETTING DATA ---->', e);
  }
};
