import Card from './models/card.js';
import mongoose from 'mongoose';
import { starterCards } from './data/cards.js';
import 'dotenv/config';

const username = process.env.DB_USER;
const password = process.env.DB_PASSWORD;

const url = `mongodb+srv://${username}:${password}@cluster0.eprmy.mongodb.net/marvelSnap?retryWrites=true&w=majority&appName=Cluster0`;

const seedDataBase = async () => {
    try {
        await mongoose.connect(url);
        console.log('Connected to database!');
        await Card.deleteMany({});
        console.log('Database cleared!');
        await Card.insertMany(starterCards);
        console.log('Database populated!');
    } catch (error) {
        console.log(error);
    } finally {
        await mongoose.disconnect();
        console.log('Closed connection to database!');
    }
};

seedDataBase();
