import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    bookName: { type: String, required: true },
    author: { type: String, required: true },
    bookSummary: { type: String, required: true },
    genre:{ type:String ,require:true},
    pdfUrl: { type: String, required: true },
    bookCoverUrl: { type: String, required: true },
    upload_date:{  type: Date, default: Date.now },
    publication_date:{type:Date, required:true},
    likes:{type:Number}
  });

export const Books = new mongoose.model("Books", bookSchema)

