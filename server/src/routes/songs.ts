import express, { Request, Response } from "express";
import { songModel, songInstance } from "../models/song";

const router = express.Router();

router.post("/save", async (req, res) => {
  const newSong = new songModel({
    name: req.body.name,
    imageUrl: req.body.imageUrl,
    songURL:  req.body.songURL,
    album: req.body.album,
    artist: req.body.artist,
    language: req.body.language,
    category: req.body.category,
  });
  try {
    const savedArtist = await newSong.save();
    res
      .status(200)
      .send({ success: "Artist saved successfully", artist: savedArtist });
  } catch (error) {
    res.status(400).send({ success: false, msg: error });
  }
});


export default router