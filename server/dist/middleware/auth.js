"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetUser = void 0;
const firebase_config_1 = __importDefault(require("../config/firebase.config"));
const GetUser = async (req, res) => {
    try {
        if (!req.headers.authorization) {
            return res.status(404).json({ message: "resquest Not Found" });
        }
        const token = req.headers.authorization.split(" ")[1];
        const decodeValue = await firebase_config_1.default.auth().verifyIdToken(token);
        if (!decodeValue) {
            return res.status(505).json({ message: "UnAuthorized" });
        }
        else {
            return res.status(200).json(decodeValue);
        }
    }
    catch (error) {
        return res.status(500).json({
            Error: error,
            route: "/user/signup",
        });
    }
};
exports.GetUser = GetUser;
// const newUserData = async (decodeValue: any, req: Request, res: Response) => {
//     const newUser = new user({
//       name: decodeValue.name,
//       email: decodeValue.email,
//       imageURL: decodeValue.picture,
//       user_id: decodeValue.user_id,
//       email_verfied: decodeValue.email_verified,
//       role: "member",
//       auth_time: decodeValue.auth_time,
//     });
//     try {
//       const savedUser = await newUser.save();
//       res.status(200).send({ user: savedUser });
//     } catch (err) {
//       res.status(400).send({ success: false, msg: err });
//     }
//   };
//   const updateUserData = async (decodeValue: any, req: Request, res: Response) => {
//     const filter = { user_id: decodeValue.user_id };
//     const options = {
//       upsert: true,
//       new: true,
//     };
//     try {
//       const result = await user.findOneAndUpdate(
//         filter,
//         { auth_time: decodeValue.auth_time },
//         options
//       );
//       res.status(200).send({ user: result });
//     } catch (err) {
//       res.status(400).send({ success: false, msg: err });
//     }
//   };
