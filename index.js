import bodyParser from 'body-parser';
import express from 'express';
import cors from 'cors'
import bookRouter from './routes/bookroute.js'
import quoteRouter from './routes/quoteroute.js'
import { connectDB } from './data/dbconnection.js';
import {config} from 'dotenv'

config({
    path:"./data/config.env"
})
const app = express();

// using middlewares
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.json())
app.use(cors());

//connecting mongodb
connectDB();


// using routes
app.use('/api/v1/books',bookRouter);
app.use('/api/v1',quoteRouter);

// home route
app.get('/', (req, res) => {
    res.send('<h1>This is backend dashboard</h1>');
})
app.listen(process.env.PORT || 4000, () => {
    console.log('Server started')
})