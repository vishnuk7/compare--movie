import axios from "axios";

// dotenv.config({ path: __dirname + "/.env" });
console.log(process.env.API_KEY);
const fetchData = async () => {
  const res = await axios.get("http://www.omdbapi.com/", {
    params: {
      apikey: process.env.API_KEY,
      s: "batman",
    },
  });

  console.log(res);
};

fetchData();
