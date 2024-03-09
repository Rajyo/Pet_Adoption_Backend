import mongoose from 'mongoose';

const PetAdoptionAppointmentSchema = new mongoose.Schema({
    adoptionDate: {
        type: String,
        required: true,
    },
    fullName: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true
    },
    petName: {
        type: String,
        required: true,
    },
    petGender: {
        type: String,
        required: true,
    },
    petType: {
        type: String,
        required: true,
    },
    petAgeInWeeks: {
        type: Number,
        required: true
    },
    petPic: {
        type: String,
        required: true,
    },
    petBreed: {
        type: String,
        required: true,
    },

}, { timestamps: true }
);


export default mongoose.model("PetAdoptionAppointment", PetAdoptionAppointmentSchema);