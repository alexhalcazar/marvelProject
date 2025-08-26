import express from 'express';
import {
    searchCharacter,
    searchRecommendation,
    searchLatestComics
} from '../controllers/marvelController.js';

const router = express.Router();

router.get('/character', searchCharacter);
router.get('/comics', searchLatestComics);
router.get('/character/nameStartsWith', searchRecommendation);

export default router;
