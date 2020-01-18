//Serveur
const express = require("express");
const app = express();

const cors = require("cors");
// acce serveur
app.use(cors());

// Protection contre les vulnérabilités HTTP
const helmet = require("helmet");
app.use(helmet());

// Parse le `body` des requêtes HTTP reçues
const bodyParser = require("body-parser");
bodyParser.urlencoded({ extended: true });
app.use(bodyParser.json());

//Var env
require("dotenv").config();

// Models init
require("./Models/User");

// Connexion à la BDD
const mongoose = require("mongoose");
// Replace update() with updateOne(), updateMany(), or replaceOne()
// Replace remove() with deleteOne() or deleteMany().
// Replace count() with countDocuments(), unless you want to count how many documents are in the whole collection (no filter). In the latter case, use estimatedDocumentCount().

mongoose.connect("mongodb://localhost:27017/MyANIMElist", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});

//Default path
app.get("/", async (req, res) => {
  try {
    res.status(200).json({ message: "Ok" });
  } catch (error) {
    res.status(400).json({ error: "jeanmit" });
  }
});

//Route user
const userRoutes = require("./Routes/Users/Signin");
const loginUser = require("./Routes/Users/Login");

app.use("/api", userRoutes);
app.use("/api", loginUser);

// Gestion des pages inexistantes : Toutes les méthodes HTTP (GET, POST, etc.) des pages non trouvées afficheront une erreur 404
app.all("*", (req, res) => {
  res.status(404).end();
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port" ${process.env.PORT}`);
  // console.log(`Current environment is ${process.env.NODE_ENV}`);
});
