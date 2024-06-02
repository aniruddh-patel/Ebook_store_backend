import { Contactform } from "../models/Contactus.js";

export const contacthandler = async (req, res) => {
    try {
        const { FullName, Email, ContactNumber, Message } = req.body;
        if (!FullName || !Email || !ContactNumber || !Message) {
            return res.status(400).json({ success: false, message: 'All fields are required.' });
          }
        const newContactform= new Contactform({
            FullName,
            Email,
            ContactNumber,
            Message,
          });
      
          // Save book document to MongoDB
          await newContactform.save();        
          res.status(201).json({success:true,message:"Submitted Successfully"});
    } catch (error) {
        return res.status(404).json({
            success: false,
            message: error
        });
    }
}