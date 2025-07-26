import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import characterRouter from './backend/routes/characterRoutes.js';
import snapRouter from './backend/routes/snapRoutes.js';
import 'dotenv/config';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, '/frontend/dist')));

app.get('/config', (req, res) => {
    res.json({ apiUrl: process.env.API_URL });
});
app.use('/api/characters', characterRouter);
app.use('/database', snapRouter);

app.listen(port, '0.0.0.0', async () => {
    console.log(`server is listening on port ${port}`);
});
