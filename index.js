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

// Route pour récupérer les comics

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

// Une route pour récupérer les comics qui sontkliés aux perosnnages

app.get("/related-comics", async (req, res) => {
  try {
    console.log(req.query);
    const response = await axios.get(
      "https://lereacteur-marvel-api.herokuapp.com/comics/" +
        req.query.characterID +
        "?apiKey=" +
        process.env.MARVEL_API_KEY
    );
    return res.status(200).json("route des comics reliés au personnages");
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
