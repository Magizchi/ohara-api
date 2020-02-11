const router = require("express").Router();
const fetch = require("node-fetch");
const jwt = require("jsonwebtoken");
//Models
const Favorites = require("../../Models/Favorites");
//...

//Routes save new users
router.get("/home", async (req, res, next) => {
  // GET manga from other API
  const year = new Date().getFullYear();
  const month = new Date().getMonth();
  // const season = getSeason(month);
  let result = {
    favorite: [],
    manga: [],
    anime: []
  };
  // await fetch(`https://api.jikan.moe/v3/season/${year}/${season}`, {
  //   method: "GET"
  // })
  await fetch(`https://api.jikan.moe/v3/top/manga`, {
    method: "GET"
  })
    .then(data => data.json())
    .then(res => (result.manga = res.top));

  await fetch(`https://api.jikan.moe/v3/top/anime`, {
    method: "GET"
  })
    .then(data => data.json())
    .then(response => (result.anime = response.top));

  //GET cookie from header for determinate user
  if (req.headers.cookie) {
    let token = "";
    let decoded = "";
    //slice(6) delete 'token=' from req.headers.cookie
    token = req.headers.cookie.slice(6);
    //decode token with secretkey
    decoded = jwt.verify(token, "secretkey");
    //get user id
    const userID = decoded.userToken.id;
    const favorite = await Favorites.findOne({ user_id: userID });
    if (favorite) {
      console.log("favorite", favorite);
    } else {
      result.favorite = [];
    }
  }

  res.json({ result });
  return;
});

// function getSeason(month) {
//   if (2 <= month <= 4) {
//     return "spring";
//   }

//   if (5 <= month <= 7) {
//     return "summer";
//   }

//   if (8 <= month <= 10) {
//     return "fall";
//   }

//   // Months 11, 00, 01
//   return "winter";
// }
// function filterAnime(anime) {
//   if (anime) {
//     let listAnime = [];
//     listAnime = anime.filter(
//       elem =>
//         new Date(elem.airing_start).getFullYear() === new Date().getFullYear()
//     );
//     listAnime = anime.filter(elem => {
//       if (elem.genres.length > 0) {
//         return elem.genres[0].name !== "Hentai";
//       } else if (elem.genres.length === 0) {
//         return elem;
//       }
//     });
//     return listAnime;
//   }
// }
module.exports = router;
