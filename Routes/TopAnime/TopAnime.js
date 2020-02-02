const router = require("express").Router();
const fetch = require("node-fetch");
const jwt = require("jsonwebtoken");
//Models
const Favorites = require("../../Models/Favorites");
//...

//Routes save new users
router.get("/top/anime", async (req, res, next) => {
  // GET manga from other API
  let topmanga = [];

  await fetch(`https://api.jikan.moe/v3/top/anime`, {
    method: "GET"
  })
    .then(data => data.json())
    .then(response => res.json({ topanime: response.top }));

  return;
});

module.exports = router;
