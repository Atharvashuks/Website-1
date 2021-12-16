const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    name : {
        type:String,
        required:true
    },
    email : {
        type:String,
        unique:true,
        required:true
    },
    number: {
        type:Number,
        unique:true,
        required:true
    },
    pass : {
        type:String,
        unique:true,
        required:true
    },
    Cpass:{
        type:String,
        unique:true,
        required:true
    },
    course:{
        type:String
    }

})

const Register = new mongoose.model("Register",schema);

module.exports = Register;