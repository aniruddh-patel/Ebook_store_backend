import { Books } from "../models/Book.js";

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