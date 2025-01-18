import express from 'express';
import fetch from 'node-fetch';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();
const port = 5000;

app.use(cors({
    origin: 'http://localhost:5173', // Frontend URL
    methods: ['GET', 'POST'], // Allowed methods
  }));

app.get('/weather', async (req, res) => {
    const city = req.query.city || 'London';
    const API_KEY = process.env.WEATHER_API_KEY;
    try{
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`);
        const data = await response.json();
        res.json(data);
    } catch (e){
        console.error(e);
        res.status(500).json({message: 'Error fetching weather data'});
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });