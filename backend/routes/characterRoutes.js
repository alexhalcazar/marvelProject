import express from 'express';
import { searchCharacter } from '../controllers/characterController.js';
import { searchRecommendation } from '../controllers/characterController.js';

const router = express.Router();

router.get('/search', searchCharacter);

router.get('/startsWith', searchRecommendation);

export default router;
