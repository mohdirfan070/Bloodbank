const mongoose = require('mongoose');

const donorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    bloodGroup: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    email:{
        type:String,
        required: true,
        unique:[true , "Email already exists!"]
    },
    gender: {
        type: String,
        required: true

    },
    address: {
        type: String,
        required: true

    },
    availability: {
        type: Boolean,
        default: true
    },
    lastDonateDate :{
        type: Date,
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    password: {
        type: String,
        required: [true, "Password requied!"],
      },
    isAdmin:{
        type:Boolean,
        default:false
    },
    healthHistory:{
        type:String,
        required:true,
        default:"no",
        enum:["yes","no"]
    },
    
}, { timestamps: true });

module.exports = mongoose.model("Donor", donorSchema);