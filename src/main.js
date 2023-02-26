import "./style.css";
import updateWeather from "./updateWeather";

// ask user for his geo position
navigator.geolocation.getCurrentPosition(
  handleSuccessPermission,
  handleRejectPermission
);

function handleSuccessPermission(position) {
  console.log("success");
  updateWeather(position.coords.latitude, position.coords.longitude);
}

function handleRejectPermission() {
  console.log("reject");
  // Dundee, Scotland
  updateWeather(56.46913, -2.97489);
}
