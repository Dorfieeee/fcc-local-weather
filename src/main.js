import "./style.css";
import updateWeather from "./updateWeather";
import getWeatherDetails from "./apis/weatherDetails.js";
import getLocationCoords from "./apis/geolocation.js";
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

function handleUnitSwitchClick(event) {
  let unitSelected = event.target.value;

  if (unitSystem === unitSelected) return;

  for (let btn of event.target.parentElement.children) {
    toggleUnitSwitchStyle(btn);
  }

  unitSystem = unitSelected;
  updateWeather(weatherData, unitSystem);
}

async function handleDisplayWeatherBySearch() {
  let lat, lon;
  let searchInput = $("#input");
  let searchQuery = searchInput.value
    .split(",")
    // remove any leading and trailing non letter characters
    .map((chunk) => chunk.replaceAll(/(^[^\p{L}]*)|([^\p{L}]*$)/gu, ""))
    // filter out any empty and only whitespace containing chunks
    .filter((chunk) => chunk !== "" || !/^\d*$/.test(chunk))
    .join(",");

  if (!searchQuery) {
    displayError("Invalid input, try it again.");
    return;
  }

  searchInput.value = searchQuery;

  try {
    [lat, lon] = await getLocationCoords(searchQuery);
    weatherData.current = await getWeatherDetails("weather", lat, lon);
    weatherData.forecast = await getWeatherDetails("forecast", lat, lon);
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
  const displayDuration = 1000;
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const errorEl = document.createElement("div");
  errorEl.innerHTML = msg;
  errorEl.className = `absolute -top-20 w-full p-4 bg-red-400 transition-transform duration-700 translate-y-0`;
  errorEl.onclick = () => errorEl.remove();
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

function toggleUnitSwitchStyle(el) {
  el.classList.toggle("active");
}

const handleForecastPointerDown = (() => {
  let translateX = 0;

  return (event) => {
    event.preventDefault();

    const $forecast = event.currentTarget;
    const $forecastContainer = event.currentTarget.parentElement;
    let forecastMaxOffset =
      $forecast.getBoundingClientRect().width -
      $forecastContainer.getBoundingClientRect().width;

    $forecast.setPointerCapture(event.pointerId);

    $forecast.style.cursor = "grabbing";

    $forecast.addEventListener("pointermove", handlePointerMoveOverForecast);
    $forecast.addEventListener("pointerup", handlePointerUpForecast);

    function handlePointerMoveOverForecast(event) {
      translateX += event.movementX;
      if (forecastMaxOffset + translateX < 0) {
        translateX = -forecastMaxOffset;
      } else if (translateX > 0) {
        translateX = 0;
      }
      $forecast.style.transform = `translateX(${translateX}px)`;
    }

    function handlePointerUpForecast(e) {
      $forecast.style.cursor = "";
      $forecast.removeEventListener(
        "pointermove",
        handlePointerMoveOverForecast
      );
      $forecast.removeEventListener("pointerup", handlePointerUpForecast);
    }
  };
})();

function main() {
  // ask the user for a permission to access his geolocation information
  navigator.geolocation.getCurrentPosition(
    handleSuccessPermission,
    handleRejectPermission
  );

  $("#celsiusBtn").addEventListener("click", handleUnitSwitchClick);
  $("#fahrenheitBtn").addEventListener("click", handleUnitSwitchClick);
  $("#forecast").addEventListener("pointerdown", handleForecastPointerDown);
  $("#forecast").addEventListener("dragstart", () => false);
  $("#submit").addEventListener("click", handleDisplayWeatherBySearch);

  if (unitSystem === "metric") {
    toggleUnitSwitchStyle($("#celsiusBtn"));
  } else {
    toggleUnitSwitchStyle($("#fahrenheitBtn"));
  }
}
