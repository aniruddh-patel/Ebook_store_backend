import bodyParser from 'body-parser';
import express from 'express';
import cors from 'cors'
import bookRouter from './routes/bookroute.js'
import quoteRouter from './routes/quoteroute.js'
import userRouter from './routes/userroute.js'
import { connectDB } from './data/dbconnection.js';
import { config } from 'dotenv'
import cookieParser from 'cookie-parser';

config({
    path: "./data/config.env"
})
const app = express();

// using middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin:[process.env.FRONTEND_URL],
    methods:["GET","POST","PUT","DELETE"],
    credentials:true,
}));

//connecting mongodb
connectDB();


// using routes
app.use('/api/v1/books', bookRouter);
app.use('/api/v1', quoteRouter);
app.use('/user', userRouter);

// home route
app.get('/', (req, res) => {
    res.send('<h1>This is backend dashboard</h1>');
})
app.listen(process.env.PORT || 4000, () => {
    console.log('Server started')
})