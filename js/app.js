import axios from "axios";

// dotenv.config({ path: __dirname + "/.env" });
console.log(process.env.API_KEY);
const fetchData = async (movieName) => {
  const res = await axios.get("http://www.omdbapi.com/", {
    params: {
      apikey: process.env.API_KEY,
      s: movieName,
    },
  });

  console.log(res);
};

const debounce = (cb, delay = 1000) => {
  let timeOutId;
  return (...args) => {
    if (timeOutId) clearTimeout(timeOutId);
    (timeOutId = setTimeout(() => cb.apply(null, args))), delay;
  };
};

const inputOneHandler = (event) => {
  fetchData(event.target.value);
};

const inputOne = document.getElementById("input-1");
inputOne.addEventListener("input", debounce(inputOneHandler, 500));
