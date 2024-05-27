import { Quotes } from "../models/Quote.js";

export const getquote = async(req, res) => {
    try {
        const quotes = await Quotes.find({});
        const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
        res.status(200).json(randomQuote)
    } 
    catch (error) {
        res.status(500).send('Error fetching quotes');
    }
}