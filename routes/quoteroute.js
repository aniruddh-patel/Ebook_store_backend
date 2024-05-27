import express from 'express'
import { getquote } from '../controller/quotecontroller.js';

const router =express.Router()

router.get('/quotes', getquote)
export default router;