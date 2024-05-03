import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://v2.jokeapi.dev/joke/Programming?type=single";

app.use(express.static("public"));


app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.post("/submit", async (req, res) => {
  try {
    const response = await axios.get(`${API_URL}`);
    const result = response.data.joke;
    const jokeLines = result.split('\n');
    res.render("index.ejs", { joke: jokeLines });
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", {
      error: error.message,
    });
  }

});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

