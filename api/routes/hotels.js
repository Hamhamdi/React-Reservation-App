import express from "express";
import {
  createHotel,
  deleteHotel,
  getHotel,
  getHotels,
  updateHotel,
} from "../controllers/hotel.js";
  const router = express.Router();

//CREATE

// connecting to db creting collections so it's gonna take a lot of time
//we have to use async because different taches have to run:
router.post("/", createHotel);
//UPDATE
router.put("/:id", updateHotel);
//DELETE
router.delete("/:id", deleteHotel);
//GET
router.get("/:id", getHotel);
//GETALL
router.get("/", getHotels);

// const failed = true
// if(failed)return next(createError(401, "You are not authenticated!"))

export default router;
