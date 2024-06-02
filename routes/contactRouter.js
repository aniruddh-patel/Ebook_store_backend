import express from 'express'
import { contacthandler } from '../controller/contactcontroller.js';

const router =express.Router()

router.post('/new', contacthandler)
export default router;