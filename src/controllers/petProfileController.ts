import Pet from "../models/Pet";
import { Request, Response } from "express"
import { CustomError } from "../utils/custom-error.model";


//CREATE hotel
export const createPetProfile = async (req: Request, res: Response) => {

    const newPetProfile = new Pet(req.body)
    try {
        const savedPetProfile = await newPetProfile.save();
        res.status(200).json(savedPetProfile);

    } catch (error) {
        throw new CustomError(404, "Error while Creating User")
    }
}

//GET PetProfile
export const getPetProfile = async (req: Request, res: Response) => {
    try {
        const petProfile = await Pet.findById(req.params.id);
        res.status(200).json(petProfile);

    } catch (err) {
        throw new CustomError(404, "Error while Getting User")

    }
}


//GET ALL PetProfiles
export const getAllPetProfiles = async (req: Request, res: Response) => {
    try {
        const allPetProfiles = await Pet.find();
        res.status(200).json(allPetProfiles);

    } catch (err) {
        throw new CustomError(404, "Error while Getting All Users")

    }
}