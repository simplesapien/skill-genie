import express from "express";
import apiRoutes from "./routes/api.js";
const app = express();

app.use("/api", apiRoutes);

app.listen(5000, () => console.log("Server started on port 5000"));
