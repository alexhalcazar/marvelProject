import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import marvelRouter from './backend/routes/characterRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, '/frontend/public')));
app.use(express.static(path.join(__dirname, '/frontend/src')));

app.get('/', (req, res) => {
    res.sendFile(
        path.join(__dirname, 'frontend', 'src', 'views', 'index.html')
    );
});

app.get('/marvelSnap', (req, res) => {
    res.sendFile(
        path.join(__dirname, 'frontend', 'src', 'views', 'marvelSnap.html')
    );
});

app.use('/api/characters', marvelRouter);

app.listen(port, () => {
    console.log(`server is listening on port ${port}`);
});
