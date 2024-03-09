import express from "express";
import { verifyAdmin, verifyUser } from "../utils/verifyToken";
import { createPetAdoptionAppointment, getPetAdoptionAppointment } from "../controllers/petAdoptionAppointment";

const router = express.Router();

//CREATE
router.post("/", verifyUser, createPetAdoptionAppointment);

//GET
router.get("/find/:id", verifyUser, getPetAdoptionAppointment);


export default router