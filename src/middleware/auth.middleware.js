// src/middleware/auth.middleware.js
import jwt from 'jsonwebtoken';
import getDb from '../models/db.js';

const JWT_SECRET = process.env.JWT_SECRET || 'secrettoken';

async function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const accessToken = authHeader && authHeader.split(' ')[1];
  const refreshToken = req.headers['x-refresh-token'];

  if (!accessToken) {
    return res.status(401).json({ error: 'Acesso negado. Token não fornecido.' });
  }

  try {
    // Verifica se o Access Token é válido
    const user = jwt.verify(accessToken, JWT_SECRET);
    req.user = user;
    return next();
  } catch (err) {
    if (err.name === 'TokenExpiredError' && refreshToken) {
      try {
        const db = await getDb();
        const tokenRecord = await db.RefreshToken.findOne({ where: { token: refreshToken } });

        if (!tokenRecord || new Date() > tokenRecord.expiresAt) {
          return res.status(403).json({ error: 'Refresh Token inválido ou expirado.' });
        }

        const user = jwt.verify(refreshToken, JWT_SECRET);
        const newAccessToken = jwt.sign(
          { id: user.id, email: user.email },
          JWT_SECRET,
          { expiresIn: '15m' }
        );

        // Renova o Refresh Token para mais 7 dias
        tokenRecord.expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
        await tokenRecord.save();

        res.setHeader('x-access-token', newAccessToken); // Envia o novo Access Token
        req.user = user;
        return next();
      } catch (refreshError) {
        return res.status(403).json({ error: 'Não foi possível renovar o token. Faça login novamente.' });
      }
    } else {
      return res.status(403).json({ error: 'Token inválido ou expirado.' });
    }
  }
}

export default authenticateToken;