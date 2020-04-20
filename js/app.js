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

let timeOutId;
const inputOneHandler = (event) => {
  if (timeOutId) clearTimeout(timeOutId);
  timeOutId = setTimeout(() => fetchData(event.target.value), 500);
};

const inputOne = document.getElementById("input-1");
inputOne.addEventListener("input", inputOneHandler);
