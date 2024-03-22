import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config';

interface MyRequest extends Request {
  userId?: string;
}

const verifyToken = (req: MyRequest, res: Response, next: NextFunction): void => {
  const authHeader = req.header('Authorization');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ error: 'Unauthorized - No token provided' });
    return;
  }

  const token = authHeader.split(' ')[1];

  jwt.verify(token, config.jwtSecret, (err, decoded) => {
    if (err) {
      res.status(401).json({ error: 'Unauthorized - Invalid token' });
      return;
    }
    req.userId = (decoded as { userId: string }).userId;
    next();
  });
};

export default verifyToken;
