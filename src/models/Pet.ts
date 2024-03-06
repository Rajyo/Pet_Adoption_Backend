import mongoose from 'mongoose';

const PetSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    gender: {
        type: String,
        required: true,
    },
    typeOfPet: {
        type: String,
        required: true,
    },
    ageInWeeks: {
        type: Number,
        required: true
    },
    pic: {
        type: String,
        required: true,
    },
    breed: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true
    },
    petInfo: [{
        type: String,
        required: true,
    }],
    petBehaviour: {
        type: String,
        required: true,
    },
    dateTime: {
        type: String,
        required: true
    },
    likes: [{
        type: mongoose.Types.ObjectId,
        ref: "User",
        unique: true,
        required: false
    }],

}, { timestamps: true }
);


export default mongoose.model("Pet", PetSchema);