// import axios from "axios";
import { debounce } from "./util/util.js";
import { AutoComplete } from "./autocomplete.js";
import { key } from "../key.js";

const onMovieSelect = async (movieId) => {
  const res = await axios.get("http://www.omdbapi.com/", {
    params: {
      apikey: key,
      i: movieId,
    },
  });
  document.getElementById("summary-1").innerHTML = movieTemplate(res.data);
  let timeId;
  clearTimeout(timeId);
  timeId = setTimeout(() => {
    document.querySelector(".movie-detail-1").classList.remove("fade");
  }, 500);
};

const renderOption = (movie) => {
  const imageUrl = movie.Poster === "N/A" ? "./img/logo.svg" : movie.Poster;
  const title = movie.Title;
  return `
  <div class="drop-image">
      <img src=${imageUrl} alt=${title}/>
    </div>
    <div class="drop-title">${title}</div>
    `;
};

const rootElement = document.querySelector(".drop-down");
const inputId = "input-1";
const autoComplete = new AutoComplete(
  rootElement,
  inputId,
  onMovieSelect,
  renderOption
);

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
inputOne.addEventListener(
  "input",
  debounce(autoComplete.inputOneHandler.bind(this), 500)
);

document.addEventListener("click", closeDropdown);
