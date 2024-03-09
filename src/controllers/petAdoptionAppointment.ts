import PetAdoptionAppointment from "../models/PetAdoptionAppointment";
import { Request, Response } from "express"
import { CustomError } from "../utils/custom-error.model";
import { RequestWithUserRole } from "../utils/verifyToken";
import User from "../models/User";


//CREATE PetAdoption
export const createPetAdoptionAppointment = async (req: RequestWithUserRole, res: Response) => {

    // const newPetAdoption = new PetAdoptionAppointment({
    //     adoptionDate: req.body.adoptionDate,
    //     fullName: req.body.fullName,
    //     phoneNumber: req.body.phoneNumber,
    //     address: req.body.address,
    //     petName: req.body.petName,
    //     petGender: req.body.petGender,
    //     petTypeOfPet: req.body.typeOfPet,
    //     petAgeInWeeks: req.body.petAgeInWeeks,
    //     petPic: req.body.petPic,
    //     petBreed: req.body.petBreed,
    // })
    const newPetAdoption = new PetAdoptionAppointment(req.body)

    try {
        await newPetAdoption.save();
        // console.log(newPetAdoption);
        await User.findByIdAndUpdate(req.user?.id, { $push: { petAdoptionId: newPetAdoption._id } }, { new: true })
        res.status(200).json(newPetAdoption)

    } catch (error) {
        console.log(error);
        throw new CustomError(404, "Error while Creating PetAdoption")
    }
}


//GET PetAdoption
export const getPetAdoptionAppointment = async (req: RequestWithUserRole, res: Response) => {
    try {
        const petAdoption = await PetAdoptionAppointment.findById(req.params.id)
        res.status(200).json(petAdoption);

    } catch (err) {
        throw new CustomError(404, "Error while Getting PetAdoption")
    }
}