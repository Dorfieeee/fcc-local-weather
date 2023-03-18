import "./style.css";
import updateWeather from "./updateWeather";
import getWeatherDetails from "./apis/weatherDetails.js";
import getLocationCoords from "./apis/geolocation.js";
import { $ } from "./utils";

let weatherData = null;
let unitSystem = "metric";

document.addEventListener("DOMContentLoaded", main);

async function handleSuccessPermission(position) {
  weatherData = await getWeatherDetails(
    position.coords.latitude,
    position.coords.longitude
  );
  updateWeather(weatherData, unitSystem);
}

async function handleRejectPermission() {
  // Kaliningrad, Russia
  weatherData = await getWeatherDetails(54.70649, 20.51095);
  updateWeather(weatherData, unitSystem);
}

function handleUnitSwitchClick(e) {
  let unitSelected = e.target.value;

  if (unitSystem === unitSelected) return;

  unitSystem = unitSelected;
  updateWeather(weatherData, unitSystem);
}

async function handleDisplayWeatherBySearch(event) {
  let searchText = $("#input").value;
  let splitText = searchText.split(",");
  splitText = splitText.map((string) => string.trim()).join(",");
  let coords = await getLocationCoords(splitText);

  weatherData = await getWeatherDetails(coords[0], coords[1]);
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
  $("#submit").addEventListener("click", handleDisplayWeatherBySearch);
}
