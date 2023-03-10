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
export const celciusToFahrenheit = (C) => C * (9 / 5) + 32;

/**
 * Converts a value representing Fahrenheit to Celcius
 * @param {float} F
 * @returns {float}
 */
export const fahrenheitToCelcius = (F) => (F - 32) * (5 / 9);

export const kmToMi = (km) => km / 1.609344;
