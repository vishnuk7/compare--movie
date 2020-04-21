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
    rootElement.innerHTML = "";
    rootElement.classList.remove("dropdown-item");
  } else {
    console.log("yes");
    rootElement.classList.add("is-dropdown");
    rootElement.innerHTML = "";
    for (let movie of movies) {
      const imageUrl = movie.Poster === "N/A" ? "./img/logo.svg" : movie.Poster;
      const title = movie.Title;
      const dropDown = document.createElement("a");
      dropDown.classList.add("dropdown-item");
      dropDown.innerHTML = `
      <div class="drop-image">
          <img src=${imageUrl} alt=${title}/>
        </div>
        <div class="drop-title">${title}</div>
        `;

      dropDown.addEventListener("click", () => {
        rootElement.classList.remove("is-dropdown");
        document.getElementById("input-1").value = title;
        onMovieSelect(movie.imdbID);
      });

      rootElement.appendChild(dropDown);
    }
  }
};

const onMovieSelect = async (movieId) => {
  const res = await axios.get("http://www.omdbapi.com/", {
    params: {
      apikey: process.env.API_KEY,
      i: movieId,
    },
  });

  console.log(res);
  document.getElementById("summary-1").innerHTML = movieTemplate(res.data);
  let timeId;
  clearTimeout(timeId);
  timeId = setTimeout(() => {
    document.querySelector(".movie-detail-1").classList.remove("fade");
  }, 500);
};

const movieTemplate = (movieDetails) => {
  return `
  <div class="main-content">
    <div>
      <img src="${movieDetails.Poster}" alt="${movieDetails.Title}">
    </div>
    <div class="movie-data">
      <h1>${movieDetails.Title}</h1>
      <h4>${movieDetails.Genre}</h4>
      <p>${movieDetails.Plot}</p>  
    </div>
  </div>
    <div class="statistics">
    <article>
      <p class="title">${movieDetails.Awards}</p>
      <p class="subtitle">Awards</p>
    </article>
    <article>
      <p class="title">${movieDetails.BoxOffice}</p>
      <p class="subtitle">Box Office</p>
    </article>
    <article>
      <p class="title">${movieDetails.Metascore}</p>
      <p class="subtitle">Mete Score</p>
    </article>
    <article>
      <p class="title">${movieDetails.imdbRating}</p>
      <p class="subtitle">Imdb Rating</p>
    </article>
    <article>
      <p class="title">${movieDetails.imdbVotes}</p>
      <p class="subtitle">Imdb Votes</p>
    </article>
    </div>
  `;
};

const closeDropdown = (event) => {
  const clikedElement = document
    .querySelector(".input-section")
    .contains(event.target);

  if (!clikedElement) {
    rootElement.classList.remove("is-dropdown");
  }
};

const inputOne = document.getElementById("input-1");
inputOne.addEventListener("input", debounce(inputOneHandler, 500));

document.addEventListener("click", closeDropdown);
