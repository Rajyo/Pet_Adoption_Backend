import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    location: {
        type: String,
        default: "Mumabi, Maharashtra",
        required: false
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    petAdoptionId: [{
        type: mongoose.Schema.ObjectId,
        ref: "PetAdoptionAppointment",
        required: false,
    }],

}, { timestamps: true }
);


export default mongoose.model("User", UserSchema);