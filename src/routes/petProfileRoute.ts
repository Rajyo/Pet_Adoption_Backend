import express from "express";
import { verifyAdmin } from "../utils/verifyToken";
import {createPetProfile, getPetProfile, getAllPetProfiles} from "../controllers/petProfileController"

const router = express.Router();


// CREATE
router.post("/", verifyAdmin, createPetProfile);

//GET
router.get("/find/:id", verifyAdmin, getPetProfile);

//GET ALL
router.get("/", verifyAdmin, getAllPetProfiles);


export default router