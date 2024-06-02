import mongoose from "mongoose";

const ContactFormSchema = new mongoose.Schema({
    FullName: { type: String, required: true },
    Email: { type: String, required: true },
    ContactNumber: { type: Number, required: true },
    Message:{ type:String ,require:true},
    Request_Date:{  type: Date, default: Date.now },
  });

export const Contactform = new mongoose.model("Contactform", ContactFormSchema)

