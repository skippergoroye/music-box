import express, { Request, Response } from "express";
import { albumModel, albumInstance } from "../models/album";


const router = express.Router();

router.get("/getAll", async(req: Request , res: Response)=> {
    return res.json("getting all albums")

})

export default router