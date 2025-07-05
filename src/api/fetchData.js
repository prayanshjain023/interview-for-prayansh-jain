import axios from "axios";

const API_URL = "https://api.spacexdata.com/v5/launches/latest";

export async function fetchData() {
  try {
    const response = await axios.get(`${API_URL}`);
    return response;
  } catch (error) {
    console.error(error, "Failed to fetch data");
  }
}