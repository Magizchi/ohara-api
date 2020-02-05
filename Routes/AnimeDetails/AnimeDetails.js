const router = require("express").Router();
const fetch = require("node-fetch");
//Models
//...

//Routes save new users
router.get("/top/anime/:id", async (req, res, next) => {
  console.log("id", req.params.id);

  await fetch(`https://api.jikan.moe/v3/anime/${req.params.id}/`, {
    method: "GET"
  })
    .then(data => data.json())
    .then(response => res.json({ response }));

  return;
});

module.exports = router;
