import mongoose from "mongoose"

export const connectDB = () => {
    mongoose.connect(process.env.MONGO_URL).then(() => {
        console.log("Connected with mongodb")
    }).catch((err) => {
        console.log(err)
    })
}