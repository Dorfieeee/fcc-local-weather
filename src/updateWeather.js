import {
  $,
  celciusToFahrenheit,
  epochToTime,
  kmToMi,
  weatherIcon,
} from "./utils.js";

/**
 * Updates the weather information with the given data.
 * It assumes the default unit system is metric.
 *
 * @param {Number} weatherDetails An object obtained from the current weather API
 * @param {Number} unitSystem Unit system - "metric" | "imperial"
 *
 */
export default async (weatherDetails, unitSystem) => {
  const isMetric = unitSystem === "metric";
  // The degree sign has code 176
  const tempUnit = `${String.fromCharCode(176)}${isMetric ? "C" : "F"}`;
  const distUnit = isMetric ? "km" : "mi";
  const speedUnit = isMetric ? "km/h" : "mph";

  const { country, sunset, sunrise } = weatherDetails.sys;
  const { name, dt, visibility } = weatherDetails;
  const { feels_like, humidity, pressure, temp, temp_max, temp_min } =
    weatherDetails.main;
  const { icon, description, main } = weatherDetails.weather[0];
  const { speed, deg } = weatherDetails.wind;

  updateField($("#visibility"), {
    value: Math.round(isMetric ? visibility / 1000 : kmToMi(visibility / 1000)),
    unit: distUnit,
    desc: "Can't see shit...",
  });

  updateField($("#humidity"), {
    value: humidity,
    unit: "%",
    desc: "You can drink the air!",
  });

  updateField($("#wind"), {
    value: Math.round(isMetric ? speed : kmToMi(speed)),
    unit: speedUnit,
    desc: "Blows your umbrealla away.",
  });

  updateField($("#pressure"), {
    value: pressure,
    unit: "hPa",
    desc: `Water boils at ${Math.round(
      isMetric ? 93 : celciusToFahrenheit(93)
    )}${tempUnit}.`,
  });

  updateField($("#feels-like"), {
    value: Math.round(isMetric ? feels_like : celciusToFahrenheit(feels_like)),
    unit: tempUnit,
    desc: "Feels good, man!",
  });

  updateField($("#temp"), {
    value: Math.round(isMetric ? temp : celciusToFahrenheit(temp)),
    unit: tempUnit,
  });

  updateField($("#sunrise"), { value: epochToTime(sunrise) });

  updateField($("#sunset"), { value: epochToTime(sunset) });

  updateField($("#daytimes"), {
    desc: `${epochToTime(sunset - sunrise)} hrs of daylight.`,
  });

  updateField($("#city"), { value: `${name}, ${country}` });

  updateField($("#clouds"), {
    value: description[0].toUpperCase() + description.slice(1),
  });

  updateField($("#last-update"), {
    value: `${new Intl.DateTimeFormat("en-GB", { weekday: "long" }).format(
      new Date(dt * 1000)
    )}, ${epochToTime(dt)}`,
  });

  updateField($("#temp-min"), {
    value: Math.round(isMetric ? temp_min : celciusToFahrenheit(temp_min)),
    unit: tempUnit,
  });

  updateField($("#temp-max"), {
    value: Math.round(isMetric ? temp_max : celciusToFahrenheit(temp_max)),
    unit: tempUnit,
  });

  $("#icon").innerHTML = `
  <a href="https://www.flaticon.com/free-icons/cloud" title="Icons created by iconixar - Flaticon"><img src=${weatherIcon(
    main
  )} alt="${description}" class="md:w-full md:mx-auto" width=96 height=96 /></a>

        
      `;
};

function updateField(el, data) {
  for (const key in data) {
    el.querySelector(`[data-${key}]`).innerText = data[key];
  }
}
