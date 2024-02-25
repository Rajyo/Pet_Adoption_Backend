import express from "express"
import { verifyAdmin, verifyUser } from "../utils/verifyToken";
import { deleteUser, getAllUsers, getUser, updateUser } from "../controllers/userController";

const router = express.Router()

//UPDATE
router.put("/",verifyUser, updateUser);

//DELETE
router.delete("/",verifyAdmin, deleteUser);

//GET
router.get("/",verifyUser, getUser);

//GET ALL
router.get("/getAllUsers",verifyAdmin, getAllUsers);


export default router