import express from "express";
import { createCourse } from "../utils/createCourse.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const data = await createCourse(req.query.param);
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

export default router;
