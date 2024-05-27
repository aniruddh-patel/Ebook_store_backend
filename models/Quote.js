import mongoose from "mongoose";

const quoteSchema = new mongoose.Schema({
    statement: String,
    author: String
});

export const Quotes = new mongoose.model("Quotes", quoteSchema)
 