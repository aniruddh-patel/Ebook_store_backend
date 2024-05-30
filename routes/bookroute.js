import express from 'express'
import multer from 'multer';

import { getallbookshandler,getonebookhandler , uploadBookhandler } from '../controller/bookcontroller.js';
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const router = express.Router();


router.get('/', getallbookshandler);
router.get('/:id',getonebookhandler);


// Route to handle book upload
router.post('/new', upload.fields([{ name: 'pdfFile', maxCount: 1 }, { name: 'bookCoverUrl', maxCount: 1 }]), uploadBookhandler);

export default router
