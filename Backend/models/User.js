const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    role: {
        type: String,
        required: [true, "role is required"],
        default:"organisation",
        enum: ["organisation"],
      },
      name: {
        type: String,
        required: true 
      },
      organizationName: {
        type: String,
        required: true 
      },
     
      email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
      },
      password: {
        type: String,
        required: [true, "Password is requied"],
      },
      address: {
        type: String,
        required: [true, "Address is required"],
      },
      mobile: {
        type: String,
        required: [true  , "Mobile Number is necessary"]
    },
    isAdmin:{
        type:Boolean,
        default:false
    }
},{timestamps:true});
module.exports = mongoose.model("User",userSchema);