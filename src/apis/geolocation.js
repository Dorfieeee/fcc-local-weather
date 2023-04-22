import axios from "axios";

export default async (input) => {
  let coords = [];
  let response;

  try {
    response = await axios.get(
      `https://api.openweathermap.org/geo/1.0/direct?q=${input}&limit=1&appid=${
        import.meta.env.VITE_API_KEY
      }`
    );
  } catch (error) {
    throw new Error("Bad request.");
  }

  try {
    coords[0] = response.data[0].lat;
    coords[1] = response.data[0].lon;
    return coords;
  } catch (error) {
    throw new Error("No result found.");
  }
};
