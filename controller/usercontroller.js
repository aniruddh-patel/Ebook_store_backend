import { Users } from "../models/User.js";
import bcrypt from 'bcrypt';
import { sendcookie } from "../utils/cookie.js";

export const registerhandler = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        let user = await Users.findOne({ email });

        if (user)
            return res.status(404).json({
                success: false,
                message: "User Already Exist"
            });

        const hashedPassword = await bcrypt.hash(password, 10)
        user = await Users.create({ name, email, password: hashedPassword })

        sendcookie(user, res, "Registered Successfully", 201)
    } catch (error) {
        return res.status(404).json({
            success: false,
            message: error
        });
    }

}


export const loginhandler = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await Users.findOne({ email }).select("+password");
        if (!user)
            return res.status(404).json({
                success: false,
                message: "Invalid email or password"
            });
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch)
            return res.status(404).json({
                success: false,
                message: "Invalid email or password"
            });
        sendcookie(user, res, `Welcome back, ${user.name}`, 200);
    } catch (error) {
        return res.status(404).json({
            success: false,
            message: error
        });
    }
}


export const getmyprofile = (req, res,) => {
    try {
        res.status(200).json({
            success: true,
            user: req.user,
        })
    } catch (error) {
        return res.status(404).json({
            success: false,
            message: error
        });
    }
}



export const logouthandler = (req, res) => {
    try {
        res
            .status(200)
            .cookie("token", "", { expires: new Date(Date.now()) })
            .json({
                success: true,
                user: req.user,
            })
    } catch (error) {
        return res.status(404).json({
            success: false,
            message: error
        });
    }
}