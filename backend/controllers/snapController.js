import mongo from '../models/db.js';

export const searchCard = async (req, res) => {
    let query;
    if (req.method === 'POST') {
        query = req.body;
    }
    if (req.method === 'GET') {
        query = req.param.query;
    }
    if (query) {
    }
    const db = mongo();
    try {
        await db.connect();
        const response = await db.find(query);
        const documents = await response.toArray();
        res.json(documents);
    } catch (error) {
        console.log('Network', error);
        res.status(500).json({ error: 'Network Error' });
    } finally {
        await db.close();
    }
};
