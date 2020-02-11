const router = require("express").Router();
const uid2 = require("uid2");

//Models
// const Token = require("../../Models/Token");
const Users = require("../../Models/User");

//crypts inputs
const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");

//Routes save new users
router.route("/signin").post(async (req, res, next) => {
  const usersFound = Users.findOne({ email: req.body.email });
  if (
    usersFound &&
    (usersFound.email === req.body.email ||
      usersFound.pseudo === req.body.pseudo)
  ) {
    res.statusMessage = "Email or pseudo already used";
    res.status(400).end();
    return;
  } else {
    //Generate Token and salt, date
    // const token = uid2(32);
    const salt = uid2(32);
    // const date = new Date();

    //Crypts password
    const hash = SHA256(req.body.password + salt).toString(encBase64);

    //Save USER
    const newUser = new Users({
      email: req.body.email,
      pseudo: req.body.pseudo,
      auth: {
        salt: salt,
        hash: hash
      }
    });

    await newUser.save(async (err, saved) => {
      if (err) {
        res.statusMessage = "Error";
        res.status(400).end();
        return;
      } else {
        res.statusMessage = "Success";
        res.status(200).end();
        return;
      }
    });
  }
  return;
});

module.exports = router;
