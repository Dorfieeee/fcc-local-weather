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

async function handleDisplayWeatherBySearch() {
  let searchText = document.getElementById("string").value;
  let splitText = searchText.split(",");
  let city = "";
  let stateCode = "";
  let countryCode = "";
  let coords;
  if (splitText.length < 3) {
    city = splitText[0].trim();
    countryCode = splitText[1].trim();
    coords = await getLocationCoords(city, countryCode);
  } else {
    city = splitText[0].trim();
    stateCode = splitText[1].trim();
    countryCode = splitText[2].trim();
    coords = await getLocationCoords(city, stateCode, countryCode);
  }

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
