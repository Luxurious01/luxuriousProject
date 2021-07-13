const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        min: 3
    },
    lastName:{
        type:String,
        require:true,
        min:3
    },
    email:{
        type:String,
        required:true,
        unique: true,
        lowercase: true
        
    },
    password:{
        type:String,
        required:true
    },
    role: {
        type: String,
        enum: ['user','admin'],
        default: 'user'
    },
    contactNumber: { type:String},
    profilePicture:{ type:String}
})


userSchema.pre('save' ,async function(next){
    if(this.isModified("password")){
        this.password =await bcrypt.hash(this.password,12);
    }
    next();
});


const User = mongoose .model("User",userSchema);
module.exports = User;