// src/routes/auth.route.js
import express from 'express';
import authController from '../controllers/auth.controller.js';

const router = express.Router();

// Rota de Login
router.post('/login', authController.login);

// Rota de Refresh Token
router.post('/refresh', authController.refresh);

// Rota de Logout
router.post('/logout', authController.logout);

export default router;