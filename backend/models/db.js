import { MongoClient } from 'mongodb';
import 'dotenv/config';

const username = process.env.DB_USER;
const password = process.env.DB_PASSWORD;

const mongo = () => {
    let client = null;
    let db = null;
    const url = `mongodb+srv://${username}:${password}@cluster0.eprmy.mongodb.net/marvelSnap?retryWrites=true&w=majority&appName=Cluster0`;

    const connect = async () => {
        try {
            client = new MongoClient(url);
            await client.connect();
            db = client.db();
            console.log('Connected to database!');
        } catch (error) {
            console.log('Failed to connect to database:', error.message);
            throw new Error('Database connection failed');
        }
    };

    const find = async (query) => {
        try {
            let regexString;
            if (!query) {
                return await db.collection('marvelCards').find();
            } else if (typeof query === 'string') {
                // doing a search by character name
                regexString = new RegExp(query);
                query = { name: regexString };
                return await db.collection('marvelCards').find(query);
            } else {
                return await db.collection('marvelCards').find({}).sort(query);
            }
        } catch (error) {
            console.log('Failed to query database:', error.message);
            throw new Error('Database query failed');
        }
    };

    const findRandom = async () => {
        try {
            return await db
                .collection('marvelCards')
                .aggregate([{ $sample: { size: 4 } }]);
        } catch (error) {
            console.error('Failed to query database:', error.message);
            throw new Error('Database query failed');
        }
    };

    const close = async () => {
        try {
            if (client) {
                client.close();
                console.log('Disconnected from database!');
            } else {
                console.log('No active database connection to close.');
            }
        } catch (error) {
            console.log(
                'Error when disconnecting from database:',
                error.message
            );
        }
    };

    return {
        connect,
        find,
        findRandom,
        close
    };
};

export default mongo;
