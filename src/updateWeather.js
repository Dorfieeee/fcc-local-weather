import getWeatherDetails from "./apis/weatherDetails.js";
import { $, epochToTime } from "./utils.js";

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
  const $humidity = $("#humidity");
  const $wind = $("#wind");
  const $pressure = $("#pressure");
  const $sun = $("#sunrise-sunset");
  const $feelsLike = $("#feels-like");
  const $visibility = $("#visibility");

  const weatherDetails = await getWeatherDetails(lat, lon);

  const { country, sunset, sunrise } = weatherDetails.sys;
  const { name, dt, visibility } = weatherDetails;
  const { feels_like, humidity, pressure, temp, temp_max, temp_min } =
    weatherDetails.main;
  const { icon, description } = weatherDetails.weather[0];
  const { speed, deg } = weatherDetails.wind;

  $visibility.innerHTML = `${Math.floor(visibility / 1000)} km`;
  $city.innerHTML = `${name}, ${country}`;
  $humidity.innerHTML = `${humidity} %`;
  $wind.innerHTML = `${speed} km/h`;
  $pressure.innerHTML = `${pressure} hPa`;
  $sun.innerHTML = ` &uarr;${epochToTime(sunrise)}<br>&darr;${epochToTime(
    sunset
  )}`;
  $feelsLike.innerHTML = `${Math.round(feels_like)} &#176;C`;
  $temperature.innerHTML = `${Math.round(temp)} &#176;C`;
  $icon.innerHTML = `
        <img src=${icon} alt="${description}" width=120 height=120 />
      `;
};
