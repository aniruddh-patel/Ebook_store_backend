import express from 'express'
import { registerhandler, loginhandler, getmyprofile, logouthandler } from '../controller/usercontroller.js';
import { isauthenticated } from '../middlewares/auth.js';

const router = express.Router();

router.post('/signup', registerhandler);
router.post('/signin', loginhandler);
router.get('/me', isauthenticated, getmyprofile);
router.get('/logout', logouthandler)


export default router
