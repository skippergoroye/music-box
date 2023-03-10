import express, { Request, Response } from "express";
import admin from "../config/firebase.config";
import { userModel, UserInstance } from "../models/user";


const router = express.Router();

router.get("/login", async (req, res) => {
  if (!req.headers.authorization) {
    return res.status(500).send({ message: "Invalid Token" });
  }
  const token = req.headers.authorization.split(" ")[1];
  try {
    const decodeValue = await admin.auth().verifyIdToken(token);
    if (!decodeValue) {
      return res.status(500).json({ message: "Un Authorize" });
    }
    // checking user email already exists or not
    const userExists = await userModel.findOne({ user_id: decodeValue.user_id });
    if (!userExists) {
      newUserData(decodeValue, req, res);
    } else {
      updateUserData(decodeValue, req, res);
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error });
  }
});

const newUserData = async (decodeValue: any, req: Request, res: Response) => {
  const newUser = new userModel({
    name: decodeValue.name,
    email: decodeValue.email,
    imageUrl: decodeValue.picture,
    user_id: decodeValue.user_id,
    email_verified: decodeValue.email_verified,
    role: "member",
    auth_time: decodeValue.auth_time,
  });
  try {
    const savedUser = await newUser.save();
    res.status(200).send({ user: savedUser });
  } catch (err) {
    res.status(400).send({ success: false, msg: err });
  }
};




const updateUserData = async (decodeValue: any, req: Request, res: Response) => {
  const filter = { user_id: decodeValue.user_id };
  const options = {
    upsert: true,
    new: true,
  };

  try {
    const result = await userModel.findOneAndUpdate(
      filter,
      { auth_time: decodeValue.auth_time },
      options
    );
    res.status(200).send({ user: result });
  } catch (err) {
    res.status(400).send({ success: false, msg: err });
  }
};


router.get("/getUsers", async (req, res) => {
  // const options = {
  //   // sort returned documents in ascending order
  //   sort: { createdAt: 1 },
  //   // Include only the following
  //   // projection : {}
  // };

  const cursor = await userModel.find().sort({ _id: -1 });
  if (cursor) {
    res.status(200).send({ success: true, data: cursor });
  } else {
    res.status(200).send({ success: true, msg: "No Data Found" });
  }
});



router.put("/updateRole/:userId", async(req, res)=>{
  const filter  = { _id: req.params.userId };
  const role = req.body.data.role;


  try {
    const result = await userModel.findOneAndUpdate(filter, { role: role });
    res.status(200).send({user : result})    
  } catch (error) {
    console.log(error) 
  }
})


router.delete("/deleteUser/:userId", async(req, res)=> {
  const filter  = { _id: req.params.userId };

  const result = await userModel.deleteOne(filter)

  if(result.deletedCount === 1){
    res.status(200).send({ success : true, msg : "User Removed"});
  } else {
    res.status(500).send({ success : false, msg : "User Not Found"})
  };

})




export default router;
