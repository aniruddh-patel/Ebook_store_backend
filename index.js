import bodyParser from 'body-parser';
import express from 'express';
import cors from 'cors'
import bookRouter from './routes/bookroute.js'
import quoteRouter from './routes/quoteroute.js'
import userRouter from './routes/userroute.js'
import contactRouter from './routes/contactRouter.js'
import { connectDB } from './data/dbconnection.js';
import { config } from 'dotenv'
import cookieParser from 'cookie-parser';
import path from 'path';
// import morgan from 'morgan';

config({
  path: "./data/config.env"
})
const app = express();

// using middlewares
// app.use(morgan('combined')) fot logs
app.use(express.static(path.join(path.resolve(),"public")))
app.set("view engine", "ejs")
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.use(express.json())
app.use(cookieParser())
app.use(cors({
  origin: [process.env.FRONTEND_URL],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));

//connecting mongodb
connectDB();

// using routes
app.use('/api/v1/books', bookRouter);
app.use('/api/v1', quoteRouter);
app.use('/user', userRouter);
app.use('/contact', contactRouter)



// home route for book add
app.get('/admin', (req, res) => {
  const { message, error } = req.query;
  res.render("index",{message,error});
})

app.listen(process.env.PORT || 4000, () => {
  console.log('Server started')
})