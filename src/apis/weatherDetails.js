import axios from "axios";

/**
 * Makes a call to the open Weather API
 *
 * @param {Number} lat A latitude
 * @param {Number} lon A longitude
 *
 * @returns {Object} The weather details object
 */
export default async (lat, lon) => {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${
        import.meta.env.VITE_API_KEY
      }&units=metric`
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
