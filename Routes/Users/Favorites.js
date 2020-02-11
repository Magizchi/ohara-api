const router = require("express").Router();
//Models
const Favorites = require("../../Models/Favorites");

router.get("/user/favorite", async (req, res, next) => {
  const userFavorite = Favorites.find();
  console.log("user", userFavorite);
  return res.json({ message: "opk" });
});

// router.post("/user/favorite", async (req, res, next) => {
//   const userFavorite = Favorites.find();
//   console.log("req", req.body);
//   return res.json({ message: "got it" });
// });

module.exports = router;
