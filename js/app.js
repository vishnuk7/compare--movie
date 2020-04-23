// import axios from "axios";
import { debounce } from "./util/util.js";
import { AutoComplete } from "./autocomplete.js";
import { key } from "../key.js";

const onMovieSelect = async (movie, desId) => {
  const res = await axios.get("http://www.omdbapi.com/", {
    params: {
      apikey: key,
      i: movie.imdbID,
    },
  });
  document.getElementById(desId).innerHTML = movieTemplate(res.data);
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

const inputValue = (movie) => {
  return movie.Title;
};

const rootElement1 = document.querySelector("#drop-down-1");
const inputId1 = "input-1";
const rootElement2 = document.querySelector("#drop-down-2");
const inputId2 = "input-2";
const autoConfig = [onMovieSelect, renderOption, inputValue];
const autoComplete1 = new AutoComplete(
  rootElement1,
  inputId1,
  "summary-1",
  ...autoConfig
);
const autoComplete2 = new AutoComplete(
  rootElement2,
  inputId2,
  "summary-2",
  ...autoConfig
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
    console.log(clikedElement);
    rootElement1.classList.remove("is-dropdown");
  }
};

const inputOne = document.getElementById("input-1");
inputOne.addEventListener(
  "input",
  debounce(autoComplete1.inputOneHandler.bind(this), 500)
);

const inputTwo = document.getElementById("input-2");
inputTwo.addEventListener(
  "input",
  debounce(autoComplete2.inputOneHandler.bind(this), 500)
);

document.addEventListener("click", closeDropdown);
