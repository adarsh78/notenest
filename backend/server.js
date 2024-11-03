import express from "express"
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import { connectDB } from "./Config/dbConnect.js";

import AuthRoutes from "./Routes/auth.route.js";
import TodoRoutes from "./Routes/todo.route.js";

connectDB();
const app = express();
dotenv.config();

app.use(bodyParser.json());


const corsOptions = {
    origin: "https://notenest-client.vercel.app", // Replace with your client URL
    methods: ["GET", "POST", "PUT", "DELETE"], // HTTP methods allowed
    credentials: true // Set to true if using cookies or authorization headers
};

app.use(cors(corsOptions));

const PORT = process.env.PORT || 3010;

app.get("/", (req, res) => {
    res.send("Hello Express");
});

app.use("/auth", AuthRoutes);
app.use("/todos", TodoRoutes);

app.listen(PORT, () => {
    console.log(`App started running at Port: http://localhost:${PORT}`)
});