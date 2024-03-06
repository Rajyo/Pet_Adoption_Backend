import express from "express";
import { verifyAdmin, verifyUser } from "../utils/verifyToken";
import {createPetProfile, getPetProfile, getAllPetProfiles, likePetProfile} from "../controllers/petProfileController"

const router = express.Router();

//CREATE
router.post("/", verifyAdmin, createPetProfile);

//GET
router.get("/find/:id", verifyUser, getPetProfile);

//GET ALL
router.get("/", verifyAdmin, getAllPetProfiles);

//PUT LikePetProfile
router.put("/like", verifyUser, likePetProfile);

//PUT UnLikePetProfile
// router.put("/unlike", verifyUser, unLikePetProfile);

export default router