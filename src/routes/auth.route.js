// src/routes/auth.route.js
import { Router } from 'express';
import authController from '../controllers/auth.controller.js';

const router = Router();

// Rota de Login
router.post('/login', authController.login);

export default router;