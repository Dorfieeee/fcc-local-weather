import { $, celciusToFahrenheit, epochToTime, kmToMi } from "./utils.js";

/**
 * Updates the weather information with the most recent data
 * based on the given parameters
 *
 * @param {Number} lat A latitude
 * @param {Number} lon A longitude
 *
 */
export default async (weatherDetails, unitSystem) => {
  const $city = $("#city");
  const $temperature = $("#temp");
  const $icon = $("#icon");
  const $humidity = $("#humidity");
  const $wind = $("#wind");
  const $pressure = $("#pressure");
  const $sun = $("#sunrise-sunset");
  const $feelsLike = $("#feels-like");
  const $visibility = $("#visibility");

  const isMetric = unitSystem === "metric";
  const tempUnit = isMetric ? "&#176;C" : "&#176;F";
  const distUnit = isMetric ? "km" : "mi";
  const speedUnit = isMetric ? "km/h" : "mph";

  const { country, sunset, sunrise } = weatherDetails.sys;
  const { name, dt, visibility } = weatherDetails;
  const { feels_like, humidity, pressure, temp, temp_max, temp_min } =
    weatherDetails.main;
  const { icon, description } = weatherDetails.weather[0];
  const { speed, deg } = weatherDetails.wind;

  $visibility.innerHTML = `${Math.round(
    isMetric ? visibility / 1000 : kmToMi(visibility / 1000)
  )} ${distUnit}`;
  $city.innerHTML = `${name}, ${country}`;
  $humidity.innerHTML = `${humidity} %`;
  $wind.innerHTML = `${Math.round(
    isMetric ? speed : kmToMi(speed)
  )} ${speedUnit}`;
  $pressure.innerHTML = `${pressure} hPa`;
  $sun.innerHTML = ` &uarr;${epochToTime(sunrise)}<br>&darr;${epochToTime(
    sunset
  )}`;
  $feelsLike.innerHTML = `${Math.round(
    isMetric ? feels_like : celciusToFahrenheit(feels_like)
  )} ${tempUnit}`;
  $temperature.innerHTML = `${Math.round(
    isMetric ? temp : celciusToFahrenheit(temp)
  )} ${tempUnit}`;
  $icon.innerHTML = `
        <img src=${icon} alt="${description}" width=120 height=120 />
      `;
};
