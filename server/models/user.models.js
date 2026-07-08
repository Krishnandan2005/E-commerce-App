import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    firstname:{
        type:String,
        required:true,
        trim:true,
    },
    lastname:{
        type:String,
        trim:true,
    },
    username:{
        type:String,
        required:true,
        trim:true,
        unique:true,
        index:true,
        lowercase:true,
    },
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true,
        lowercase:true,
    },
    password:{
        type:String,
        required:true,
        trim:true,
    },
    phone:{
        type:String,
        required:true,
    }
},{timestamps:true})

const User = mongoose.model("User",userSchema);

export default User;