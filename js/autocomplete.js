import { fetchData } from "./fetch.js";

export class AutoComplete {
  constructor(rootElement, inputTag, onMovieSelect) {
    this.rootElement = rootElement;
    this.inputTag = inputTag;
    this.onMovieSelect = onMovieSelect;
  }

  test() {
    console.log(this);
  }

  inputOneHandler = async (event) => {
    const movies = await fetchData(event.target.value);
    console.log(movies.length);
    if (movies.length === 0) {
      this.rootElement.innerHTML = "";
      this.rootElement.classList.remove("dropdown-item");
    } else {
      console.log(this);
      this.rootElement.classList.add("is-dropdown");
      this.rootElement.innerHTML = "";
      for (let movie of movies) {
        const imageUrl =
          movie.Poster === "N/A" ? "./img/logo.svg" : movie.Poster;
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
          this.rootElement.classList.remove("is-dropdown");
          document.getElementById(this.inputTag).value = title;
          this.onMovieSelect(movie.imdbID);
        });

        this.rootElement.appendChild(dropDown);
      }
    }
  };
}
