import express from 'express'
import multer from 'multer';

import { getallbookshandler, getonebookhandler, uploadBookhandler, searchbookhandler ,getcategorybookhandler} from '../controller/bookcontroller.js';
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const router = express.Router();


router.get('/', getallbookshandler);
router.get('/:id', getonebookhandler);
router.post('/new', upload.fields([{ name: 'pdfFile', maxCount: 1 }, { name: 'bookCoverUrl', maxCount: 1 }]), uploadBookhandler);
router.get('/search/book', searchbookhandler);
router.get('/category/:category', getcategorybookhandler);

export default router