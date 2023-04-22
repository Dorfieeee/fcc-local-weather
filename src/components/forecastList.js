import forecastItem from "./forecastItem.js";
import {
  epochToWeekday,
  epochToTime,
  weatherIcon,
  celciusToFahrenheit,
} from "../utils.js";

export default (items, unitSystem) => {
  const list = [];

  if (!items.length) return list;

  let currWeekday = "";
  const isMetric = unitSystem === "metric";
  // The degree sign has code 176
  const tempUnit = `${String.fromCharCode(176)}${isMetric ? "C" : "F"}`;

  items.forEach((item) => {
    const props = {};
    props.title = epochToTime(item.dt);
    props.icon = weatherIcon(item.weather[0].main);
    props.alt = item.weather[0].description;
    props.temp = Math.round(
      isMetric ? item.main.temp : celciusToFahrenheit(item.main.temp)
    );
    props.feelsLike = Math.round(
      isMetric
        ? item.main.feels_like
        : celciusToFahrenheit(item.main.feels_like)
    );
    props.tempUnit = tempUnit;

    let itemWeekday = epochToWeekday(item.dt);
    if (currWeekday !== itemWeekday) {
      props.newDay = itemWeekday;
      currWeekday = itemWeekday;
    }

    list.push(forecastItem(props));
  });

  return list;
};
