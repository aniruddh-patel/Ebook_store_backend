import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: String,
    email: {
        type:String,
        require:true,
        unique:true,
    },
    password: {
        type:String,
        require:true,
        unique:true,
        select:false,
    },
    createdAt:{
        type:Date,
        default: Date.now(),
    }
});

export const Users = new mongoose.model("Users", userSchema)