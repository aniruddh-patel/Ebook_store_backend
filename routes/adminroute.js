import express from 'express'
import { adminloginhandler } from '../controller/Admincontroller.js';

const router = express.Router();

router.post('/', adminloginhandler);



export default router
