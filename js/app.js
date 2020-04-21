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

  if (res.data.Error) {
    return [];
  }

  return res.data.Search;
};

const rootElement = document.querySelector(".drop-down");

const inputOneHandler = async (event) => {
  const movies = await fetchData(event.target.value);
  console.log(movies.length);
  if (movies.length === 0) {
    console.log("No movie found");
  } else {
    console.log("yes");
    rootElement.classList.add("is-dropdown");
    rootElement.innerHTML = "";
    for (let movie of movies) {
      const imageUrl = movie.Poster;
      const title = movie.Title;
      const dropDown = document.createElement("div");
      dropDown.classList.add("dropdown-item");
      dropDown.innerHTML = `
      <div class="drop-image">
          <img src=${imageUrl} alt=${title}/>
        </div>
        <div class="drop-title">${title}</div>
        `;
      rootElement.appendChild(dropDown);
    }
  }
};

const inputOne = document.getElementById("input-1");
inputOne.addEventListener("input", debounce(inputOneHandler, 1000));
