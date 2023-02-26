import "./style.css";
import updateWeather from "./updateWeather";

// ask the user for a permission to access his geolocation information
navigator.geolocation.getCurrentPosition(
  handleSuccessPermission,
  handleRejectPermission
);

function handleSuccessPermission(position) {
  updateWeather(position.coords.latitude, position.coords.longitude);
}

function handleRejectPermission() {
  // Dundee, Scotland
  updateWeather(56.46913, -2.97489);
}
