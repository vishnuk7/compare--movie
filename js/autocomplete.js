import { fetchData } from "./fetch.js";

export class AutoComplete {
  constructor(rootElement, inputTag, onMovieSelect, renderOption, inputValue) {
    this.rootElement = rootElement;
    this.inputTag = inputTag;
    this.onOptionSelect = onMovieSelect;
    this.renderOption = renderOption;
    this.inputValue = inputValue;
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
        const dropDown = document.createElement("a");
        dropDown.classList.add("dropdown-item");
        dropDown.innerHTML = this.renderOption(movie);

        dropDown.addEventListener("click", () => {
          this.rootElement.classList.remove("is-dropdown");
          document.getElementById(this.inputTag).value = this.inputValue(movie);
          this.onOptionSelect(movie.imdbID);
        });

        this.rootElement.appendChild(dropDown);
      }
    }
  };
}
