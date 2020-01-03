import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import redis from '../database/redis';

const verify = promisify(jwt.verify);

export default async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res
      .status(401)
      .json({ error: 'Token de autenticação não informado' });
  }

  const [, token] = authHeader.split(' ');

  try {
    const isBlocked = await redis.getAsync(token);
    if (isBlocked)
      return res.status(401).json({ error: 'Token de autenticação inválido' });

    const decoded = await verify(token, process.env.JWT_SECRET);

    req.userId = decoded.id;
    req.role = decoded.role;
    req.tokenExpiration = decoded.exp;
    req.token = token;

    return next();
  } catch (err) {
    return res.status(401).json({ error: 'Token de autenticação inválido' });
  }
};
