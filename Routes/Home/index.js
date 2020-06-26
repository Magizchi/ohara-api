const router = require("express").Router();
const fetch = require("node-fetch");
const jwt = require("jsonwebtoken");
//Models
const Favorites = require("../../Models/Favorites");
//...

//Routes save new users
router.get("/home", async (req, res, next) => {
  let result = {
    favorite: [],
    manga: [],
    anime: [],
  };

  await fetch(`https://api.jikan.moe/v3/top/manga`, {
    method: "GET",
  })
    .then((data) => data.json())
    .then((res) => (result.manga = res.top));

  await fetch(`https://api.jikan.moe/v3/top/anime`, {
    method: "GET",
  })
    .then((data) => data.json())
    .then((response) => (result.anime = response.top));

  res.status(200).json({ result });
  return;
});

module.exports = router;
