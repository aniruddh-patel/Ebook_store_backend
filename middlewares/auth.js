import jwt from 'jsonwebtoken'
import { Users } from '../models/User.js';
export const isauthenticated = async (req, res, next) => {
    const { token } = req.cookies;
    if (!token)
        return res.status(404).json({
            success: false,
            message: "Login First"
        });
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = await Users.findById(decoded._id)
    next()
} 