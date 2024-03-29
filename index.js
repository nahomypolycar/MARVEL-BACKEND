const express = require("express");
require("dotenv").config();
const cors = require("cors");
const axios = require("axios");
const app = express();
app.use(cors());

app.get("/home", (req, res) => {
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
    let filters = "";
    if (req.query.name) {
      filters = filters + "&name" + req.query.name;
    }
    const response = await axios.get(
      "https://lereacteur-marvel-api.herokuapp.com/characters?apiKey=" +
        process.env.MARVEL_API_KEY +
        filters
    );
    console.log("test>>>>", req.query.name);
    console.log("response >>>", response.data);
    return res.status(200).json({ response: response.data.results });
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
    return res.status(200).json({ response: response.data });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Une route pour récupérer les comics qui sont liés aux personnages

app.get("/comics/:characterId", async (req, res) => {
  try {
    console.log("req.params", req.params.characterId);
    const response = await axios.get(
      "https://lereacteur-marvel-api.herokuapp.com/comics/" +
        req.params.characterId +
        "?apiKey=" +
        process.env.MARVEL_API_KEY
    );
    res.status(200).json(response.data);
    res.send("test nahomy");
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

// Route pour récupérer les informations des personnages
app.get("/characters-infos", async (req, res) => {
  try {
    const response = await axios.get(
      "https://lereacteur-marvel-api.herokuapp.com/character/" +
        req.query.characterID +
        "?apiKey=" +
        process.env.MARVEL_API_KEY
    );
    console.log(response.data);
    return res.status(200).json("route infos des personnages");
  } catch (error) {
    return res.status(200).json({ error: error.message });
  }
});

app.listen(process.env.PORT, () => {
  console.log("Server launched ☄️!");
});

app.all("*", (req, res) => {
  res.status(400).json({ message: "Wrong adress" });
});
