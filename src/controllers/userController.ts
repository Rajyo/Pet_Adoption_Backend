import User from "../models/User";
import bcrypt from "bcryptjs";
import { CustomError } from "../utils/custom-error.model"
import { Response } from "express"
import { RequestWithUserRole } from "../utils/verifyToken.js";


//UPDATE user
export const updateUser = async (req: RequestWithUserRole, res: Response) => {
    try {
        if (req.body.password) {
            const salt = bcrypt.genSaltSync(10);
            var hash = bcrypt.hashSync(req.body.password, salt);
            var updatedUser = await User.findByIdAndUpdate(req?.user?.id, { $set: { ...req.body, password: hash } }, { new: true }).select("-password")
        } else {
            var updatedUser = await User.findByIdAndUpdate(req?.user?.id, { $set: {name: req.body.name} }, { new: true }).select("-password")
        }
        res.status(200).json(updatedUser);

    } catch (error) {
        throw new CustomError(404, "Error while updating User")
    }
}

//DELETE User
export const deleteUser = async (req: RequestWithUserRole, res: Response) => {
    try {
        await User.findByIdAndDelete(req?.user?.id);
        res.status(200).json("User has been deleted");

    } catch (error) {
        throw new CustomError(404, "Error while updating User")
    }
}

//GET User
export const getUser = async (req: RequestWithUserRole, res: Response) => {
    try {
        const user = await User.findById(req?.user?.id).select("-password")
        res.status(200).json(user);

    } catch (error) {
        throw new CustomError(404, "Error while fetching User")
    }
}


//GET ALL users
export const getAllUsers = async (req: RequestWithUserRole, res: Response) => {
    try {
        const users = await User.find();
        res.status(200).json(users);

    } catch (err) {
        throw new CustomError(404, "Error while fetching all Users")
    }
}