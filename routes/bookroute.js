import express from 'express'
import { getallbookshandler,getonebookhandler } from '../controller/bookcontroller.js';
import { isauthenticated } from '../middlewares/auth.js';

const router = express.Router();

router.get('/', getallbookshandler);
router.get('/:id',getonebookhandler);


export default router
