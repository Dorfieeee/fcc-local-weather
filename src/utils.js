export const $ = (selector) => document.querySelector(selector);

export const $$ = (selector) => document.querySelectorAll(selector);

export const epochToTime = (seconds) =>
  new Intl.DateTimeFormat(navigator.language, { timeStyle: "short" }).format(
    new Date(seconds * 1000)
  );

/**
 * Converts a value representing Celcius to Fahrenheit
 * @param {float} C
 * @returns {float}
 */
export const celciusToFahrenheit = (C) => (C - 273.15) * (9 / 5) + 32;

/**
 * Converts a value representing Fahrenheit to Celcius
 * @param {float} F
 * @returns {float}
 */
export const fahrenheitToCelcius = (F) => (F - 32) * (5 / 9);

export const kmToMi = (km) => km / 1.609344;

/**
 * Returns an icon url based on the given weather description.
 * You can find the description in `weather.main`.
 * @param {String} desc The main weather description .
 * @returns Icon URL
 *
 * Icon Source:
 * https://www.flaticon.com/packs/weather-161?style_id=982&family_id=250&group_id=292
 *
 * Based on:
 * https://openweathermap.org/weather-conditions#Icon-list
 */
export const weatherIcon = (desc) => {
  const size = 256;
  let id = "";

  switch (desc.toLowerCase()) {
    case "clear sky":
    case "clear":
      id = 1163662;
      break;

    case "few clouds":
      id = 1163661;
      break;

    case "scattered clouds":
      id = 1163624;
      break;

    case "clouds":
    case "broken clouds":
      id = 1163634;
      break;

    case "shower rain":
      id = 1163627;
      break;

    case "rain":
    case "drizzle":
      id = 1163657;
      break;

    case "thunderstorm":
      id = 1163636;
      break;

    case "snow":
      id = 1163629;
      break;

    case "mist":
    case "smoke":
    case "haze":
    case "dust":
    case "fog":
    case "sand":
    case "ash":
    case "squall":
      id = 1163640;
      break;

    case "tornado":
      id = 1163670;
      break;

    default:
      id = 1163661;
      break;
  }
  return `https://cdn-icons-png.flaticon.com/${size}/1163/${id}.png`;
};
