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
    const items = await fetchData(event.target.value);
    if (items.length === 0) {
      this.rootElement.innerHTML = "";
      this.rootElement.classList.remove("dropdown-item");
    } else {
      this.rootElement.classList.add("is-dropdown");
      this.rootElement.innerHTML = "";
      for (let item of items) {
        const dropDown = document.createElement("a");
        dropDown.classList.add("dropdown-item");
        dropDown.innerHTML = this.renderOption(item);

        dropDown.addEventListener("click", () => {
          this.rootElement.classList.remove("is-dropdown");
          document.getElementById(this.inputTag).value = this.inputValue(item);
          this.onOptionSelect(item);
        });

        this.rootElement.appendChild(dropDown);
      }
    }
  };
}
