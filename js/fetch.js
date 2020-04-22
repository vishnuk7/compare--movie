// import axios from "axios";
import { key } from "../key.js";
export const fetchData = async (movieName) => {
  const res = await axios.get("http://www.omdbapi.com/", {
    params: {
      apikey: key,
      s: movieName,
    },
  });

  if (res.data.Error) {
    return [];
  }

  return res.data.Search;
};
