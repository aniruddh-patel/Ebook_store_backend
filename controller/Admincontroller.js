import { Admin } from "../models/Admin.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

export const adminloginhandler = async (req, res) => {
    const { email, password } = req.body;

    try {
        const admin = await Admin.findOne({ email }).select('+password');
        if (!admin) {
            return res.status(401).send('Invalid credentials');
        }

        const isPasswordValid = await bcrypt.compare(password, admin.password);

        if (!isPasswordValid) {
            return res.status(401).send('Invalid credentials');
        }

        const token = jwt.sign({ email: admin.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.cookie('token', token, { httpOnly: true });
        res.redirect('/admin');
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).send('Server error');
    }
};
