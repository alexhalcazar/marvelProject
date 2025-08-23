import express from 'express';
import {
    searchCharacter,
    searchRecommendation,
    searchLatestComics
} from '../controllers/marvelController.js';

const router = express.Router();

router.get('/search', searchCharacter);
router.get('/comics', searchLatestComics);
router.get('/startsWith', searchRecommendation);

export default router;
