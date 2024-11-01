import express from "express";
import cors from "cors";
import { dirname } from "path";
import { fileURLToPath } from "url";
import blogRoutes from "./routes/routes.js";

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const __dirname = dirname(fileURLToPath(import.meta.url));
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.use(express.static(__dirname + "/public"));

// Routes
app.use("/", blogRoutes);

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
