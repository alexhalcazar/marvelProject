import mongo from '../models/db.js';

export const searchCard = async (req, res) => {
    const card = req.query.card;
    const db = mongo();
    try {
        await db.connect();
        const response = await db.find(card);
        const documents = await response.toArray();
        res.json(documents);
    } catch (error) {
        console.log(error);
    }
};
