import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
interface MyRequest extends Request {
  userId?: string;
}
const verifyToken = (req: MyRequest, res: Response, next: NextFunction): void => {
  const token = req.header('Authorization');
  if (!token) {
    res.status(401).json({ error: 'Unauthorized - No token provided' });
    return;
  }

  jwt.verify(token, 'your_secret_key', (err, decoded) => {
    if (err) {
      res.status(401).json({ error: 'Unauthorized - Invalid token' });
      return;
    }
    req.userId = (decoded as { userId: string }).userId;
    next();
  });
};

export default verifyToken;
