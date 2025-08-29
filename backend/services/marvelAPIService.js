import axios from 'axios';
import crypto from 'crypto';
import 'dotenv/config';

const publicKey = process.env.MARVEL_PUBLIC_KEY;
const privateKey = process.env.MARVEL_PRIVATE_KEY;

const generateHash = (ts, privateKey, key) => {
    return crypto
        .createHash('md5')
        .update(ts + privateKey + key)
        .digest('hex');
};

export const getCharacter = async (character) => {
    try {
        const ts = Date.now().toString();
        const hash = generateHash(ts, privateKey, publicKey);
        const url = `https://gateway.marvel.com/v1/public/characters?ts=${ts}&apikey=${publicKey}&hash=${hash}&name=${character}`;
        const response = await axios.get(url, { timeout: 10000 });
        //axios returns the response data wrapped in a data property
        return response.data.data.results;
    } catch (error) {
        console.log('Failed to connect to Marvel API:', error.message);
        if (error.response) {
            console.error('Response data:', error.response.data);
            console.error('Response status:', error.response.status);
        }
        throw new Error('Failed to fetch data from Marvel API');
    }
};

export const getRecommendatons = async (string) => {
    try {
        const ts = Date.now().toString();
        const hash = generateHash(ts, privateKey, publicKey);
        const url = `https://gateway.marvel.com/v1/public/characters?ts=${ts}&apikey=${publicKey}&hash=${hash}&nameStartsWith=${string}`;
        const response = await axios.get(url, { timeout: 10000 });

        const results = response.data.data.results;
        const recommendations = [];
        results.forEach((element) => {
            recommendations.push(element.name);
        });

        return recommendations;
    } catch (error) {
        console.log('Failed to connect to Marvel API:', error.message);
        if (error.response) {
            console.error('Response data:', error.response.data);
            console.error('Response status:', error.response.status);
        }
        throw new Error('Failed to fetch data from Marvel API');
    }
};

export const getComics = async () => {
    try {
        const ts = Date.now().toString();
        const hash = generateHash(ts, privateKey, publicKey);
        const url = `https://gateway.marvel.com/v1/public/comics?ts=${ts}&apikey=${publicKey}&hash=${hash}&dateDescriptor=thisWeek`;
        const response = await axios.get(url, { timeout: 10000 });
        const results = response.data.data.results;
        return results;
    } catch (error) {
        console.log(error);
        throw new Error('Failed to fetch data from Marvel API');
    }
};

export const getEvent = async (id) => {
    try {
        const ts = Date.now().toString();
        const hash = generateHash(ts, privateKey, publicKey);
        const url = `https://gateway.marvel.com/v1/public/events?ts=${ts}&apikey=${publicKey}&hash=${hash}&characters=${id}`;
        const response = await axios.get(url, { timeout: 10000 });
        const results = response.data.data.results;
        return results;
    } catch (error) {
        console.error(error);
        throw new Error('Failed to fetch data from Marvel API');
    }
};
