import express from 'express';
import { searchCharacter } from '../controllers/characterController.js';

const router = express.Router();

router.get('/search', searchCharacter);

export default router;
