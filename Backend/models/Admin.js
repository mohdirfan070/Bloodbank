const mongoose = require('mongoose');
const adminSchema = new mongoose.Schema({
    name: {
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
      mobile: {
          type: String,
          required: [true  , "Mobile Number is necessary"]
        },
        secretKey: {
          type: String,
          required: [true, "Secret is required"],
        },
    isAdmin:{
        type:Boolean,
        default:false
    }
},{timestamps:true});
module.exports = mongoose.model("Admin",adminSchema);