// src/controllers/auth.controller.js
import authService from '../services/auth.service.js';

// Controlador de Login
async function login(req, res) {
  try {
    const { email, senha } = req.body;
    const { token, usuario } = await authService.login(email, senha);
    res.status(200).json({ token, usuario });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
}

export default {
  login
};
