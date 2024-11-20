const mongoose  = require("mongoose");
const requestSchema  = new mongoose.Schema({
    from:{
        type:mongoose.Types.ObjectId,
        ref:"User",
        required:true 
    },
    to:{
        type:mongoose.Types.ObjectId,
        ref:"Donor",
        required:true 
    },
    quantity:{
        type:Number,
        required:true 
    },
    date:{
        type:Date,
        required:true 
    },
    time:{
        type:String,
        required:true 
    },
    status:{
        type:String,
        default:"Pending",
        enum:["pending","decline","accept","success","seen"],
        required:true 
    },
    msg:{
        type:String,
        required:true 
    }
},{timestamps: true});
module.exports  = mongoose.model("Request" , requestSchema);