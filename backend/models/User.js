const mongoose = require('mongoose');
 
const user_data = new mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now()
    }
})

const User = new mongoose.model("User",user_data);

module.exports = User;

