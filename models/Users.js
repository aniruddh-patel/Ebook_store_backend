import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: Number
});

export const Users = new mongoose.model("Users", userSchema)