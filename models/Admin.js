import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema({
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

export const Admin = new mongoose.model("Admin", AdminSchema)