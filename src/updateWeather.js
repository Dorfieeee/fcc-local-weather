import getWeatherDetails from "./apis/weatherDetails.js";

export default async (lat, lon) => {
  const cityEl = document.getElementById("city");
  const tempEl = document.getElementById("temp");
  const iconEl = document.getElementById("icon");

  const weatherDetails = await getWeatherDetails(lat, lon);
  const weather = weatherDetails.weather[0];

  console.log(weatherDetails);

  const country = weatherDetails.sys.country;
  const cityName = weatherDetails.name;
  const temp = weatherDetails.main.temp;
  const iconUrl = weather.icon;

  cityEl.innerHTML = `${cityName}, ${country}`;
  tempEl.innerHTML = `${temp} &#176;C`;
  iconEl.innerHTML = `
        <img src=${iconUrl} alt="${weather.description}" width=120 height=120 />
      `;
};
