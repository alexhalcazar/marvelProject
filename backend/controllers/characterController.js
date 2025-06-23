import {
    getRecommendatons,
    getCharacter
} from '../services/marvelAPIService.js';

export const searchCharacter = async (req, res) => {
    try {
        const character = req.query.name;
        if (character) {
            const data = await getCharacter(character);
            return res.json(data);
        }
    } catch (error) {
        console.log('API', error);
        res.status(500).json({ error: 'API Error' });
    }
};

export const searchRecommendation = async (req, res) => {
    try {
        const string = req.query.string;
        const data = await getRecommendatons(string);
        return res.json(data);
    } catch (error) {
        console.log('API', error);
        res.status(500).json({ error: 'API Error' });
    }
};
