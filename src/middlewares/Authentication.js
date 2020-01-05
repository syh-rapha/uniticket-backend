import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import redis from '../database/redis';

const verify = promisify(jwt.verify);

export default async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Authentication token not provided' });
  }

  const [, token] = authHeader.split(' ');

  const isBlocked = await redis.getAsync(token);
  if (isBlocked)
    return res.status(401).json({ error: 'Invalid authentication token' });

  const decoded = await verify(token, process.env.JWT_SECRET);

  req.userId = decoded.id;
  req.role = decoded.role;
  req.tokenExpiration = decoded.exp;
  req.token = token;

  return next();
};
