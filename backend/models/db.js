import { MongoClient } from 'mongodb';
import 'dotenv/config';

const username = process.env.DB_USER;
const password = process.env.DB_PASSWORD;

const mongo = () => {
    let db = null;

    const url = `mongodb+srv://${username}:${password}@cluster0.eprmy.mongodb.net/marvelSnap?retryWrites=true&w=majority&appName=Cluster0`;
    const connect = async () => {
        try {
            const client = new MongoClient(url);
            await client.connect();
            db = client.db();
            console.log('Connected to database!');
        } catch (error) {
            console.log(error);
        }
    };

    const find = async (query) => {
        try {
            if (!query) {
                return await db.collection('startercards').find();
            } else {
                const regexString = new RegExp(query);
                return await db
                    .collection('startercards')
                    .find({ character: regexString });
            }
        } catch (error) {
            console.log(error);
        }
    };
    return {
        connect,
        find
    };
};

export default mongo;
