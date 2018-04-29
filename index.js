import express from "express";
import mongoose from "mongoose";
import routes from "./src/routes/route";
const app = express();
const PORT = 3000;

//mongoose connection
mongoose.connect("mongodb://localhost/project2"); //database connect

//bodyparser
express.urlencoded({ extended: true }); //parses incoming requests with urlencoded payloads
express.json(); //parses incoming requests with JSON payloads

routes(app); //allows for use of routes created earlier

app.get("/", (req, res) =>
  res.send(`Node and express server is running on port ${PORT}`)
);

app.listen(PORT, () => console.log(`your server is running on port ${PORT}`));
