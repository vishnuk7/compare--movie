import axios from "axios";
import { debounce } from "./util/util";

// dotenv.config({ path: __dirname + "/.env" });
const fetchData = async (movieName) => {
  const res = await axios.get("http://www.omdbapi.com/", {
    params: {
      apikey: process.env.API_KEY,
      s: movieName,
    },
  });

  return res.data.Search;
};

const inputOneHandler = async (event) => {
  const movies = await fetchData(event.target.value);

  for (let movie of movies) {
    const div = document.createElement("div");
    div.innerHTML = `
    <img src="${movie.Poster}" alt=${movie.Title}/>
    <h2>${movie.Title}</h2>
  `;

    document.getElementById("target").appendChild(div);
  }
};

const inputOne = document.getElementById("input-1");
inputOne.addEventListener("input", debounce(inputOneHandler, 1000));
