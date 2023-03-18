import axios from "axios";

/**
 * Makes a call to the open Weather API
 *
 * @param {String} type "weather" | "forecast"
 * @param {Number} lat A latitude
 * @param {Number} lon A longitude
 *
 * @returns {Object} The weather details object
 */
export default async (type, lat, lon) => {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/${type}?lat=${lat}&lon=${lon}&appid=${
        import.meta.env.VITE_API_KEY
      }&units=metric`
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
