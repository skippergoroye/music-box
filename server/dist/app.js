"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const auth_1 = __importDefault(require("./routes/auth"));
const dotenv_1 = __importDefault(require("dotenv"));
const Database_1 = __importDefault(require("./Database"));
dotenv_1.default.config();
// connect DB
(0, Database_1.default)();
const app = (0, express_1.default)();
const PORT = process.env.PORT;
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cors_1.default)({ origin: true }));
app.get("/", (req, res) => {
    return res.json("Hai there......");
});
// User Authentication route
app.use('/api/users/', auth_1.default);
app.listen(PORT, () => {
    console.log(`Server started on ${PORT}`);
});
