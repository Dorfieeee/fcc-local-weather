import axios from "axios";

/**
 * Makes a call to the freeCodeCamp Weather API
 *
 * @param {Number} lat A latitude
 * @param {Number} lon A longitude
 *
 * @returns {Object} The weather details object
 */
export default async (lat, lon) => {
  try {
    const response = await axios.get(
      `https://weather-proxy.freecodecamp.rocks/api/current?lat=${lat}&lon=${lon}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
