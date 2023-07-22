import express from "express";
import dotenv from "dotenv";
dotenv.config();
const port = process.env.PORT || 5000;
import userRoutes from "./routes/userRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import { protect } from "./middleware/authMiddleware.js";

const app = express();
app.use(express.json()); //Allow json data
app.use(express.urlencoded({ extended: true })); //Allow form data
app.use(cookieParser());
connectDB();

app.get("/", (req, res) => res.send("Server is Ready!"));
app.use("/api/users/", userRoutes);
app.use(notFound);
app.use(errorHandler);
app.use(protect);

app.listen(port, () => console.log("Server started on port " + port));
