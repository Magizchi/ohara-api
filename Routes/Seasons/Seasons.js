const router = require("express").Router();
const fetch = require("node-fetch");
//Models
//...

//Routes save new users
router.get("/anime", async (req, res, next) => {
  // GET manga from other API
  const year = new Date().getFullYear();
  const month = new Date().getMonth();
  const season = getSeason(month);
  let result = [];
  await fetch(`https://api.jikan.moe/v3/season/${year}/${season}`, {
    method: "GET"
  })
    .then(data => data.json())
    .then(response => (result = filterAnime(response.anime)));

  res.json({ result });
  return;
});

function getSeason(month) {
  if (2 <= month <= 4) {
    return "spring";
  }

  if (5 <= month <= 7) {
    return "summer";
  }

  if (8 <= month <= 10) {
    return "fall";
  }

  // Months 11, 00, 01
  return "winter";
}
function filterAnime(anime) {
  if (anime) {
    let listAnime = [];
    listAnime = anime.filter(
      elem =>
        new Date(elem.airing_start).getFullYear() === new Date().getFullYear()
    );
    listAnime = anime.filter(elem => {
      if (elem.genres.length > 0) {
        return elem.genres[0].name !== "Hentai";
      } else if (elem.genres.length === 0) {
        return elem;
      }
    });
    return listAnime;
  }
}
module.exports = router;
