import axios from "axios";

export default async (input) => {
  try {
    let coords = [];
    const response = await axios.get(
      `https://api.openweathermap.org/geo/1.0/direct?q=${input}&limit=1&appid=${
        import.meta.env.VITE_API_KEY
      }`
    );
    console.log(response.data);
    if (response.data.length > 0) {
      coords[0] = response.data[0].lat;
      coords[1] = response.data[0].lon;
    }
    return coords;
  } catch (error) {
    console.log(error);
    return null;
  }
};
