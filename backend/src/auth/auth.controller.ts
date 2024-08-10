import { Request, Response } from 'express';
import { Controller } from '../common';
import { AUTH_TOKEN, REFRESH_TOKEN } from './constants';
import { authService } from './auth.service';

@Controller
class AuthController {
  async login(req: Request, res: Response) {
    const {
      tokens: { authToken, refreshToken },
      user,
    } = await authService.loginUser(req.body);

    res.cookie(AUTH_TOKEN, authToken.token, { httpOnly: true, secure: true, expires: authToken.expires });
    res.cookie(REFRESH_TOKEN, refreshToken.token, { httpOnly: true, secure: true, expires: refreshToken.expires });

    res.json(user);
  }

  async registerUser(req: Request, res: Response) {
    await authService.registerUser(req.body);

    res.json({ message: 'User successfully registered.' });
  }
}

export const authController = new AuthController();
