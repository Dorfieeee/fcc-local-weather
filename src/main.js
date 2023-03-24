import "./style.css";
import updateWeather from "./updateWeather";
import getWeatherDetails from "./apis/weatherDetails.js";
import getLocationCoords from "./apis/geolocation.js";
import { $ } from "./utils";

let weatherData = null;
let unitSystem = "metric";

document.addEventListener("DOMContentLoaded", main);

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
  let lat, lon;
  let searchInput = $("#input");
  let searchQuery = searchInput.value
    .split(",")
    // filter out empty and only whitespace containing chunks
    .filter((chunk) => !chunk || !/^\d*$/.test(chunk))
    // remove any leading and trailing non letter characters
    .map((chunk) => chunk.replaceAll(/(^[^\p{L}]*)|([^\p{L}]*$)/gu, ""))
    .join(",");

  searchInput.value = searchQuery;

  if (!searchInput) return;

  try {
    [lat, lon] = await getLocationCoords(searchQuery);
    weatherData = await getWeatherDetails(lat, lon);
    updateWeather(weatherData, unitSystem);
  } catch (error) {
    displayError(error);
  }
}

// extra feature
async function displayError(msg) {
  const container = $("#weather-app").parentElement;
  const slideUp = "translate-y-0";
  const slideDown = "translate-y-20";
  const transitionDuration = 700;
  const displayDuration = 3000;
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const errorEl = document.createElement("div");
  errorEl.innerHTML = msg;
  errorEl.className = `absolute -top-20 w-full p-4 bg-red-400 transition-transform duration-700 translate-y-0`;
  container.append(errorEl);
  // need to delay due to default browser behaviour
  // await delay(0);
  // but requesting animation frame also works
  requestAnimationFrame(() => errorEl.classList.replace(slideUp, slideDown));

  await delay(transitionDuration + displayDuration);
  errorEl.classList.replace(slideDown, slideUp);

  await delay(transitionDuration);
  errorEl.remove();
}
