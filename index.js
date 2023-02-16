const express = require("express");
require("dotenv").config();
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());

app.get("/", (req, res) => {
  try {
    //console.log("api_key", process.env.MARVEL_API_KEY); pour vérifier que la clé API est bien cachée
    return res.status(200).json("Bienvenue sur la Route /");
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

// Route pour récupérer les personnages :

app.get("/characters", async (req, res) => {
  try {
    const response = await axios.get(
      "https://lereacteur-marvel-api.herokuapp.com/characters?apiKey=" +
        process.env.MARVEL_API_KEY
    );
    console.log("response >>>", response.data);
    return res.status(200).json({ response: response.data });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

app.get("/comics", async (req, res) => {
  try {
    const response = await axios.get(
      "https://lereacteur-marvel-api.herokuapp.com/comics?apiKey=" +
        process.env.MARVEL_API_KEY
    );
    res.status(200).json(response.data.results._id);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get("/comics/:characterId", (req, res) => {
  try {
    const response = axios.get(
      "https://lereacteur-marvel-api.herokuapp.com/comics/5fc8ba1fdc33470f788f88b3?apiKey=YOUR_API_KEY"
    );
    const comicsTab = response.data.results;

    console.log("comicsTab >>>", comicsTab); // ne s'affiche pas

    const charactersId = comicsTab.map((element, index) => {
      return res.status(200).json({ element: element });
    });
    console.log("response >>>", response.data);
    return res.status(200).json({ response: response.data });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

app.listen(3000, () => {
  console.log("Server launched ☄️!");
});

//http://localhost:3000/

app.all("*", (req, res) => {
  res.status(400).json({ message: "Wrong adress" });
});
