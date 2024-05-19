import express from "express";
import dotenv from "dotenv";
import {connnectToMongoose} from "./src/config/mongoose.js";
import PollRoutes from "./src/routes/index.route.js"
import bodyParser from "body-parser";

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(bodyParser.json());
app.use("/", PollRoutes);

app.listen(port, async() => {
    await connnectToMongoose();
    console.log(`Server is listening on port ${port}`);
});
