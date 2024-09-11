import { getCharacter } from '../services/marvelAPIService.js';
import { getRecommendatons } from '../services/marvelAPIService.js';

export const searchCharacter = async (req, res) => {
    try {
        const character = req.query.name;
        const data = await getCharacter(character);
        return res.json(data);
    } catch (error) {
        res.status(500).json({
            message: 'Error fetching character data',
            error
        });
    }
};

export const searchRecommendation = async (req, res) => {
    try {
        const string = req.query.string;
        const data = await getRecommendatons(string);
        return res.json(data);
    } catch (error) {
        res.status(500).json({
            message: 'Error fetching character data',
            error
        });
    }
};
