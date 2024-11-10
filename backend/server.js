import express from "express"
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import { connectDB } from "./Config/dbConnect.js";

import AuthRoutes from "./Routes/auth.route.js";
import TodoRoutes from "./Routes/todo.route.js";
import PasswordRecoveryRoutes from "./Routes/forgotPassword.route.js";

connectDB();
const app = express();
dotenv.config();

app.use(bodyParser.json());
app.use(cors());

const PORT = process.env.PORT || 3010;

app.get("/", (req, res) => {
    res.send("Hello Express");
});

app.use("/auth", AuthRoutes);
app.use("/todos", TodoRoutes);
app.use("/password-recovery", PasswordRecoveryRoutes);

app.listen(PORT, () => {
    console.log(`App started running at Port: http://localhost:${PORT}`)
});