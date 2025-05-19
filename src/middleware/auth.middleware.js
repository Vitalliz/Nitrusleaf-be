// src/middleware/auth.middleware.js
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'secrettoken';

async function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const accessToken = authHeader && authHeader.split(' ')[1];

  if (!accessToken) {
    return res.status(401).json({ error: 'Acesso negado. Token não fornecido.' });
  }

  try {
    const user = jwt.verify(accessToken, JWT_SECRET);
    req.user = user;
    console.log("🔧 Usuário autenticado:", user);
    return next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Token expirado. Por favor, faça login novamente.' });
    }
    return res.status(403).json({ error: 'Token inválido.' });
  }
}

export default authenticateToken;