import Pet from "../models/Pet";
import { Request, Response } from "express"
import { CustomError } from "../utils/custom-error.model";
import { RequestWithUserRole } from "../utils/verifyToken";
import User from "../models/User";


//CREATE PetProfile
export const createPetProfile = async (req: Request, res: Response) => {
    const newPetProfile = new Pet(req.body)
    try {
        const savedPetProfile = await newPetProfile.save();
        res.status(200).json(savedPetProfile);

    } catch (error) {
        throw new CustomError(404, "Error while Creating PetProfile")
    }
}


//GET PetProfile
export const getPetProfile = async (req: Request, res: Response) => {
    try {
        const petProfile = await Pet.findById(req.params.id);
        res.status(200).json(petProfile);

    } catch (err) {
        throw new CustomError(404, "Error while Getting PetProfile")

    }
}


//GET ALL PetProfiles
export const getAllPetProfiles = async (req: Request, res: Response) => {
    try {
        const allPetProfiles = await Pet.find();
        res.status(200).json(allPetProfiles);

    } catch (err) {
        throw new CustomError(404, "Error while Getting All PetProfiles")

    }
}



// Like PetProfile
export const likePetProfile = async (req: RequestWithUserRole, res: Response) => {
    try {
        await User.findByIdAndUpdate(req?.user?.id, { $push: { petLikedId: req.body.petProfileId } }, { new: true });
        
        const likedPetProfiles = await Pet.findByIdAndUpdate(req.body.petProfileId, { $push: { likes: req?.user?.id } }, { new: true });
        res.status(200).json(likedPetProfiles);
    } catch (err) {
        throw new CustomError(404, "Error while Liking PetProfile")
    }
}

// UnLike PetProfile
export const unLikePetProfile = async (req: RequestWithUserRole, res: Response) => {
    try {
        await User.findByIdAndUpdate(req?.user?.id, { $pull: { petLikedId: req.body.petProfileId } }, { new: true });

        const unLikedPetProfiles = await Pet.findByIdAndUpdate(req.body.petProfileId, { $pull: { likes: req?.user?.id } }, { new: true });
        res.status(200).json(unLikedPetProfiles);
    } catch (err) {
        throw new CustomError(404, "Error while UnLiking PetProfile")
    }
}