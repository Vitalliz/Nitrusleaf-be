// src/routes/auth.route.js
import express from 'express';
import authController from '../controllers/auth.controller.js';
import authenticateToken from '../middleware/auth.middleware.js';

const router = express.Router();

// Rota de Login
router.post('/login', authController.login);

// Rota de Refresh Token
router.post('/refresh', authController.refresh);

// Rota de Logout
router.post('/logout', authController.logout);

router.get('/me', authenticateToken, authController.getAuthenticatedUser);

export default router;