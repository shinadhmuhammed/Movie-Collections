import express, { Router } from "express";
const Routers = express.Router();
import controller from "../Controllers/controller.js";
import multer from "multer";
import fs from "fs";
import path from "path";

const uploadDir = path.join("uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage });

Routers.post("/signup", controller.signup);
Routers.post("/login", controller.login);
Routers.post("/movies", upload.single("image"), controller.addMovie);
Routers.get("/movies", controller.getMovie);
Routers.get("/actors-with-movies", controller.getActorsWithMovies);
Routers.get("/director-with-movies", controller.getDirectorWithMovies);

export default Routers;
