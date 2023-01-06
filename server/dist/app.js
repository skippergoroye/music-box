"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cookieParser = require("cookie-parser");
const morgan_1 = __importDefault(require("morgan"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// connect DB
mongoose_1.default.set('strictQuery', false);
mongoose_1.default.connect(process.env.DB_STRING)
    .then(() => {
    console.log("Database Connected Successfully");
})
    .catch((error) => {
    console.log(error);
});
const app = (0, express_1.default)();
const PORT = process.env.PORT;
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(cookieParser());
app.get("/", (req, res) => {
    return res.json("Hai there......");
});
app.listen(PORT, () => {
    console.log(`Server started on ${PORT}`);
});
