import getWeatherDetails from "./apis/weatherDetails.js";
import { $ } from "./utils.js";

/**
 * Updates the weather information with the most recent data
 * based on the given parameters
 *
 * @param {Number} lat A latitude
 * @param {Number} lon A longitude
 *
 */
export default async (lat, lon) => {
  const $city = $("#city");
  const $temperature = $("#temp");
  const $icon = $("#icon");

  const weatherDetails = await getWeatherDetails(lat, lon);
  const weather = weatherDetails.weather[0];

  console.log(weatherDetails);

  const country = weatherDetails.sys.country;
  const cityName = weatherDetails.name;
  const temp = weatherDetails.main.temp;
  const iconUrl = weather.icon;

  $city.innerHTML = `${cityName}, ${country}`;
  $temperature.innerHTML = `${temp} &#176;C`;
  $icon.innerHTML = `
        <img src=${iconUrl} alt="${weather.description}" width=120 height=120 />
      `;
};
