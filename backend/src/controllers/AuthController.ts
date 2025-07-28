import { Request, Response } from 'express';
import { AuthService } from '../services/AuthService';

export class AuthController {
  constructor(private authService: AuthService) {}

  async register(req: Request, res: Response): Promise<Response> {
    try {
      const user = await this.authService.register(req.body);
      return res.status(201).json(user);
    } catch (error: any) {
      if (error.code === 'ER_DUP_ENTRY') {
        return res.status(409).json({ message: 'Email já cadastrado' });
      }
      return res.status(400).json({ message: error.message });
    }
  }

  async login(req: Request, res: Response): Promise<Response> {
    try {
      const result = await this.authService.login(req.body);

      if (!result) {
        return res.status(401).json({ message: 'Email ou senha são inválidos' });
      }

      return res.status(200).json(result);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }
}