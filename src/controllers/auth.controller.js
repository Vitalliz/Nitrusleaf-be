// src/controllers/auth.controller.js
import authService from '../services/auth.service.js';

// Controlador de Login
async function login(req, res) {
  try {
    const { email, senha } = req.body;
    const { accessToken, refreshToken, usuario } = await authService.login(email, senha);
    res.status(200).json({ accessToken, refreshToken, usuario });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
}

// Controlador de Refresh Token
async function refresh(req, res) {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      return res.status(400).json({ error: 'Refresh token necessário.' });
    }

    const newAccessToken = await authService.refreshAccessToken(refreshToken);
    res.status(200).json({ accessToken: newAccessToken });
  } catch (error) {
    res.status(401).json({ error: 'Refresh token inválido.' });
  }
}

// Controlador de Logout
async function logout(req, res) {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      return res.status(400).json({ error: 'Refresh token necessário.' });
    }

    await authService.logout(refreshToken);
    res.status(200).json({ message: 'Logout bem-sucedido.' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao fazer logout.' });
  }
}

export default {
  login,
  refresh,
  logout
};