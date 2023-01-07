import express, { Request, Response } from "express";
import { artistModel, artistInstance } from "../models/artist";

const router = express.Router();

router.post("/save", async (req, res) => {
  const newArtist = new artistModel({
    name: req.body.name,
    imageUrl: req.body.imageUrl,
    twitter: req.body.twitter,
    instagram: req.body.instagram,
  });
  try {
    const savedArtist = await newArtist.save();
    res
      .status(200)
      .send({ success: "Artist saved successfully", artist: savedArtist });
  } catch (error) {
    res.status(400).send({ success: false, msg: error });
  }
});





router.get("/getOne/:id", async (req, res) => {
  const filter = { _id: req.params.id };

  const data = await artistModel.findOne(filter);

  if (data) {
    return res.status(200).send({ success: true, artist: data });
  } else {
    return res.status(400).send({ success: false, msg: "Data not found" });
  }
});




router.get("/getAll", async (req, res) => {
  // const options = {
  //     sort: {
  //         createdAt: 1,
  //     },
  // };
  const data = await artistModel.find().sort({ _id: -1 });
  if (data) {
    return res.status(200).send({ success: true, artist: data });
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
    const result = await artistModel.findOneAndUpdate(
      filter,
      {
        name: req.body.name,
        imageUrl: req.body.imageUrl,
        twitter: req.body.twitter,
        instagram: req.body.instagram,
      },
      options
    );
    res.status(200).send({ artist: result });
  } catch (error) {
    res.status(400).send({ success: false, msg: error });
  }
});





router.delete("/delete/:id", async (req, res) => {
  const filter = { _id: req.params.id };

  const result = await artistModel.deleteOne(filter);

  if (result) {
    return res
      .status(200)
      .send({ success: true, msg: "Data Deleted Successfully", data: result });
  } else {
    return res.status(400).send({ success: false, msg: "data Not found" });
  }
});

export default router;
