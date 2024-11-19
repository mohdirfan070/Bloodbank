const mongoose = require("mongoose");
const bloodSchema = new mongoose.Schema({
    bloodGroup: {
        type: String,
        required: true,
        enum: ["B+", "B-", "A+", "A-", "O+", "O-","AB+","AB-"]
    },
    donor: {
        type: String,
        required: true,
    },
    quantity:{
        type:Number,
        required:true,
        default:0
    },
    lastDonateDate:{
        type:Date
    }
}, { timestamps: true });
module.exports = mongoose.model("Blood", bloodSchema);