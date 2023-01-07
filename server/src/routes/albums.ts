import express, { Request, Response } from "express";
import { albumModel, albumInstance } from "../models/album";

const router = express.Router();

router.post("/save", async (req, res) => {
  const newAlbum = new albumModel({
    name: req.body.name,
    imageUrl: req.body.imageUrl,
  });
  try {
    const savedAlbum = await newAlbum.save();
    res
      .status(200)
      .send({ success: "Artist saved successfully", artist: savedAlbum });
  } catch (error) {
    res.status(400).send({ success: false, msg: error });
  }
});



router.get("/getOne/:id", async (req, res) => {
    const filter = { _id: req.params.id };

    const data = await albumModel.findOne(filter);

    if (data) {
        return res.status(200).send({ success: true, album: data });
    } else {
        return res.status(400).send({ success: false, msg: "Data no found" });
    }
});



router.get("/getAll", async (req, res) => {
    // const options = {
    //     sort: {
    //         createdAt: 1,
    //     },
    // };
    const data = await albumModel.find().sort({ _id: -1 });
    if (data) {
        return res.status(200).send({ success: true, album: data });
    } else {
        return res.status(400).send({ success: false, msg: "Data no found" });
    }
});



router.put("/update/:id", async (req, res) => {
    const filter = { _id: req.params.id };

    const options = {
        upsert: true,
        new: true,
    };

    try {
        const result = await albumModel.findOneAndUpdate(
        filter,
        {
            name: req.body.name,
            imageUrl: req.body.imageUrl,
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

    const result = await albumModel.deleteOne(filter);

    if (result) {
        return res
        .status(200)
        .send({ success: true, msg: "Data Deleted Successfully", data: result });
    } else {
        return res.status(400).send({ success: false, msg: "data Not found" });
    }
});






export default router;
