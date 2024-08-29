import { MongoClient } from 'mongodb';
import 'dotenv/config';

const username = process.env.DB_USER;
const password = process.env.DB_PASSWORD;

const mongo = () => {
    let db = null;

    const url = `mongodb+srv://${username}:${password}@cluster0.eprmy.mongodb.net/test?retryWrites=true&w=majority&appName=Cluster0`;
    console.log(url);
    const connect = async () => {
        // connect
        try {
            const client = new MongoClient(url);
            await client.connect();
            db = client.db();
            console.log('Connected to database!');
        } catch (error) {
            console.log(error);
        }
    };
    return {
        connect
    };
};

export default mongo;
