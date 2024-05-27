import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    name: String,
    description: String,
    price: Number
});

export const Books = new mongoose.model("Books", bookSchema)
 