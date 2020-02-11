const cors = require("cors");
const helmet = require("helmet");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const app = express();

mongoose.connect(process.env.MONGODB_URI, {
  // Replace update() with updateOne(), updateMany(), or replaceOne()
  // Replace remove() with deleteOne() or deleteMany().
  // Replace count() with countDocuments(), unless you want to count how many documents are in the whole collection (no filter). In the latter case, use estimatedDocumentCount().

  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});

// Protection contre les vulnérabilités HTTP
app.use(helmet());

// Parse le `body` des requêtes HTTP reçues
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Var env
require("dotenv").config();

// Models init
// require("./Models/User");

//Route user
const userRoutes = require("./Routes/Users/Signin");
const loginUser = require("./Routes/Users/Login");
const homePage = require("./Routes/Home/Home");
const topanime = require("./Routes/TopAnime/TopAnime");
const topmanga = require("./Routes/Mangas/TopManga.js");
const favorites = require("./Routes/Users/Favorites");
const animeDetails = require("./Routes/Details/AnimeDetails/AnimeDetails");
const mangaDetails = require("./Routes/Details/MangaDetails/MangaDetails");
// acce serveur
app.use("/api", cors());

//Default path
app.get("/", async (req, res) => {
  try {
    res.status(200).json({ message: "ok" });
  } catch (error) {
    res.status(400).json({ error: "jeanmit" });
  }
});

//prefix cors
app.use("/api", userRoutes);
app.use("/api", loginUser);
app.use("/api", homePage);
app.use("/api", favorites);
app.use("/api", mangaDetails);
app.use("/api", verifytoken, topanime);
app.use("/api", verifytoken, topmanga);
app.use("/api", verifytoken, animeDetails);
// Gestion des pages inexistantes : Toutes les méthodes HTTP (GET, POST, etc.) des pages non trouvées afficheront une erreur 404
app.all("*", (req, res) => {
  res.status(404).end();
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port" ${process.env.PORT}`);
  // console.log(`Current environment is ${process.env.NODE_ENV}`);
});

//Models
const Users = require("./Models/User");
// Authorization: Bearer <access_token>

async function verifytoken(req, res, next) {
  const bearerHeader = req.headers.cookie;

  if (typeof bearerHeader !== "undefined") {
    let token = "";
    let decoded = "";
    //slice(6) delete 'token=' from req.headers.cookie
    token = req.headers.cookie.slice(6);
    //decode token with secretkey
    decoded = jwt.verify(token, "secretkey");
    //get user id
    const userID = decoded.userToken.id;
    const User = await Users.findOne({ _id: userID });
    if (User) {
      return next();
    } else {
    }
    next();
  } else {
    res.sendStatus(403);
  }
}
