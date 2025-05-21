// src/routes/history.route.js
import express from 'express';
import { getHistoryData } from '../controllers/history.controller.js';

const router = express.Router();

// GET /history/:id - histórico da propriedade
router.get('/:id', getHistoryData);

export default router;
