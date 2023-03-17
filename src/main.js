import "./style.css";
import updateWeather from "./updateWeather";
import getWeatherDetails from "./apis/weatherDetails.js";
import { $ } from "./utils";

let weatherData = {
  current: null,
  forecast: null,
};
let unitSystem = "metric";

document.addEventListener("DOMContentLoaded", main);

async function handleSuccessPermission(position) {
  weatherData.current = await getWeatherDetails(
    "weather",
    position.coords.latitude,
    position.coords.longitude
  );
  weatherData.forecast = await getWeatherDetails(
    "forecast",
    position.coords.latitude,
    position.coords.longitude
  );
  updateWeather(weatherData, unitSystem);
}

async function handleRejectPermission() {
  // Kaliningrad, Russia
  weatherData.current = await getWeatherDetails("weather", 54.70649, 20.51095);
  weatherData.forecast = await getWeatherDetails(
    "forecast",
    54.70649,
    20.51095
  );
  updateWeather(weatherData, unitSystem);
}

function handleUnitSwitchClick(e) {
  let unitSelected = e.target.value;

  if (unitSystem === unitSelected) return;

  unitSystem = unitSelected;
  updateWeather(weatherData, unitSystem);
}

function main() {
  // ask the user for a permission to access his geolocation information
  navigator.geolocation.getCurrentPosition(
    handleSuccessPermission,
    handleRejectPermission
  );

  $("#celsiusBtn").addEventListener("click", handleUnitSwitchClick);
  $("#fahrenheitBtn").addEventListener("click", handleUnitSwitchClick);
}
