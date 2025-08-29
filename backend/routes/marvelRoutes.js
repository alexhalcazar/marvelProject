import express from 'express';
import {
    searchCharacter,
    searchRecommendation,
    searchLatestComics,
    searchEvent
} from '../controllers/marvelController.js';

const router = express.Router();

router.get('/character', searchCharacter);
router.get('/character/nameStartsWith', searchRecommendation);
router.get('/comics', searchLatestComics);
router.get('/events', searchEvent);

export default router;
