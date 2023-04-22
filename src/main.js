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

function handleUnitSwitchClick(event) {
  let unitSelected = event.target.value;

  if (unitSystem === unitSelected) return;

  for (let btn of event.target.parentElement.children) {
    toggleUnitSwitchStyle(btn);
  }

  unitSystem = unitSelected;
  updateWeather(weatherData, unitSystem);
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

  if (unitSystem === "metric") {
    toggleUnitSwitchStyle($("#celsiusBtn"));
  } else {
    toggleUnitSwitchStyle($("#fahrenheitBtn"));
  }
}
