import express from "express";
import cors from "cors";
import { ENV } from "./config/env.js";
import { connectDB } from "./config/db.js";
import formRoute from "./route/form.route.js";
import { globalErrorHandler } from "./middleware/globalErrorHandler.js";
import { throwError } from "./utils/throwError.js";

const app = express();
const { PORT, CLIENT_URL } = ENV;

app.use(express.json());
app.use(
  cors({
    origin: CLIENT_URL,
  })
);

app.use("/api", formRoute);

app.get("/health", (req, res) => {
  res.send("Working fine");
});

app.use(globalErrorHandler);

app.listen(PORT || 3000, () => {
  connectDB();
  console.log("Listening on port", PORT);
});
