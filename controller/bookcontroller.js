import { Books } from "../models/Book.js";
import { s3 } from '../data/awsconnection.js'

export const getallbookshandler = async (req, res) => {
    try {
        const books = await Books.find({});
        res.status(200).json({
            success: true,
            books
        })
    }
    catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}
export const getonebookhandler = async (req, res) => {
    try {
        const books = await Books.findById(req.params.id);
        if (!books) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.status(200).json({
            success: true,
            books
        })
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}

// Function to upload file to S3

// Controller function to handle book upload
const uploadFileToS3 = (file, folder) => {
    const params = {
      Bucket: process.env.S3_BUCKET_NAME,
      Key: `${folder}/${file.originalname}`,
      Body: file.buffer,
      ContentType: file.mimetype,
    };
    return s3.upload(params).promise();
  };
  

  export const uploadBookhandler = async (req, res) => {
    // console.log(req.files); 
    const { bookName, author, bookSummary, genre, publication_date } = req.body;
  
    // Check if the files are available
    if (!req.files.pdfFile || !req.files.bookCoverUrl) {
      return res.status(400).json({ message: 'PDF file and cover image are required.' });
    }
  
    const pdfFile = req.files.pdfFile[0];
    const bookCoverUrl = req.files.bookCoverUrl[0];
  
    try {
      // Upload files to S3
      const pdfUploadResult = await uploadFileToS3(pdfFile, 'pdfs');
      const bookCoverUrlUploadResult = await uploadFileToS3(bookCoverUrl, 'images');
  
      // Create new book document
      const newBook = new Books({
        bookName,
        author,
        bookSummary,
        genre,
        pdfUrl: pdfUploadResult.Location,
        bookCoverUrl: bookCoverUrlUploadResult.Location,
        publication_date,
        likes:0,
      });
  
      // Save book document to MongoDB
      await newBook.save();
      res.status(201).json({success:true,message:"Uploaded book Successfully",newBook});
    } catch (error) {
      console.error('Error uploading file:', error);
      res.status(500).json({ success:false,message: 'Error uploading file' });
    }
  };