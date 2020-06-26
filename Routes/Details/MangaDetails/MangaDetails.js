const router = require("express").Router();
const fetch = require("node-fetch");
//Models
//...

//Routes save new users
router.get("/top/manga/:id", async (req, res, next) => {
  await fetch(`https://api.jikan.moe/v3/manga/${req.params.id}/`, {
    method: "GET",
  })
    .then((data) => data.json())
    .then((response) => res.json({ response }));

  return;
});

module.exports = router;
