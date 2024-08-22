import { getCharacter } from '../services/marvelAPIService.js';

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
