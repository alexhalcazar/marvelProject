import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import characterRouter from './backend/routes/characterRoutes.js';
import snapRouter from './backend/routes/snapRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

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

app.use('/api/characters', characterRouter);
app.use('/database', snapRouter);

app.listen(port, '0.0.0.0', async () => {
    console.log(`server is listening on port ${port}`);
});
