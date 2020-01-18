const router = require("express").Router();

//Models
const Users = require("../../Models/User");
const Token = require("../../Models/Token");

//Crypts
const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");

router.post("/login", async (req, res) => {
  const user = await Users.findOne({ pseudo: req.body.pseudo });
  if (user) {
    //Get auth info
    const hash = user.auth.hash;
    const salt = user.auth.salt;

    //Verify password
    const hashLogin = SHA256(req.body.password + salt).toString(encBase64);
    if (hash === hashLogin) {
      const token = await Token.findOne({ user_id: user._id });
      res.statusMessage = "Connected";
      res.status(200).json({ token: token.token });
      return;
    } else {
      res.statusMessage = "wrong password";
      res.status(400).end(); //json({ message: "wrong password" });
      return;
    }
  } else {
    res.statusMessage = "Account don't exist";
    res.status(400).end(); //json({ message: "Account don't exist" });
    return;
  }
});

module.exports = router;
