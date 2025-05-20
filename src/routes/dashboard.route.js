// src/routes/dashboard.route.js
import express from 'express';
import { getDashboardData } from '../controllers/dashboard.controller.js';

const router = express.Router();

router.get('/:propertyId', getDashboardData);

export default router;