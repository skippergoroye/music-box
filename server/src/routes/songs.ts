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
    const savedSong = await newSong.save();
    res
      .status(200)
      .send({ success: "Song saved successfully", song: savedSong });
  } catch (error) {
    res.status(400).send({ success: false, msg: error });
  }
});




router.get("/getOne/:id", async (req, res) => {
    const filter = { _id: req.params.id };

    const data = await songModel.findOne(filter);

    if (data) {
        return res.status(200).send({ success: true, song: data });
    } else {
        return res.status(400).send({ success: false, msg: "Data notfound" });
    }
});



router.get("/getAll", async (req, res) => {
    // const options = {
    //     sort: {
    //         createdAt: 1,
    //     },
    // };
    const data = await songModel.find().sort({ _id: -1 });
    if (data) {
        return res.status(200).send({ success: true, songs: data });
    } else {
        return res.status(400).send({ success: false, msg: "Data not found" });
    }
});




router.put("/update/:id", async (req, res) => {
    const filter = { _id: req.params.id };
  
    const options = {
      upsert: true,
      new: true,
    };
  
    try {
      const result = await songModel.findOneAndUpdate(
        filter,
        {
            name: req.body.name,
            imageUrl: req.body.imageUrl,
            songURL:  req.body.songURL,
            album: req.body.album,
            artist: req.body.artist,
            language: req.body.language,
            category: req.body.category,
        },
        options
      );
      return res.status(200).send({ success: true, data: result });
    } catch (error) {
      res.status(400).send({ success: false, msg: error });
    }
});




router.delete("/delete/:id", async (req, res) => {
    const filter = { _id: req.params.id };
  
    const result = await songModel.deleteOne(filter);
  
    if (result) {
      return res
        .status(200)
        .send({ success: true, msg: "Data Deleted Successfully", data: result });
    } else {
      return res.status(400).send({ success: false, msg: "data Not found" });
    }
});


export default router