import axios from "axios";

export default async (latitude, longitude) => {
  try {
    const response = await axios.get(
      `https://weather-proxy.freecodecamp.rocks/api/current?lat=${latitude}&lon=${longitude}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
