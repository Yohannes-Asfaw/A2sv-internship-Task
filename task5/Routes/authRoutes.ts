import express from 'express';
import { signup, login } from '../Controller/authController';
const authrouter = express.Router();
authrouter.post('/api/auth/signup', signup);
authrouter.post('/api/auth/login', login);
export default authrouter;