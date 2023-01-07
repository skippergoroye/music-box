import express, { Request, Response } from "express";


const router = express.Router();

router.get("/getAll", async(req: Request , res: Response)=> {
    return res.json("getting all songs")
})


export default router