import { Router } from 'express';
import { authController } from './auth.controller';

export const authRouter: Router = Router();

authRouter.post('/login', authController.login);
authRouter.post('/register', authController.registerUser);
