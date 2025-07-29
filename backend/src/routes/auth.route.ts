import { Router } from 'express';
import { AuthController } from '../controllers/AuthController';
import { AuthService } from '../services/AuthService';

const router = Router();
const authService = new AuthService();
const authController = new AuthController(authService);

/**
 * @swagger
 * tags:
 * name: Autenticação
 * description: Endpoints de cadastro e login de usuários
 */

/**
 * @swagger
 * /api/auth/register:
 * post:
 * summary: Registra um novo usuário
 * tags: [Autenticação]
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * type: object
 * required:
 * - email
 * - password
 * properties:
 * email:
 * type: string
 * password:
 * type: string
 * responses:
 * 201:
 * description: Usuário criado com sucesso
 * 409:
 * description: E-mail já está em uso
 */
router.post('/register', authController.register.bind(authController));

/**
 * @swagger
 * /api/auth/login:
 * post:
 * summary: Autentica um usuário e retorna um token
 * tags: [Autenticação]
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * type: object
 * required:
 * - email
 * - password
 * properties:
 * email:
 * type: string
 * password:
 * type: string
 * responses:
 * 200:
 * description: Login bem-sucedido, retorna usuário e token
 * 401:
 * description: Email ou senha inválidos
 */
router.post('/login', authController.login.bind(authController));

export default router;