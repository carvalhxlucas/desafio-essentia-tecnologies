import { AppDataSource } from "../data-source";
import { User } from "../entities/User";
import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";

export class AuthService {
  private userRepository = AppDataSource.getRepository(User);

  async register(userData: Partial<User>): Promise<Omit<User, 'password'>> {
    if (!userData.email || !userData.password) {
      throw new Error('Email e senha são obrigatórios');
    }

    const hashedPassword = await bcrypt.hash(userData.password, 10);

    const user = this.userRepository.create({
      email: userData.email,
      password: hashedPassword,
    });

    await this.userRepository.save(user);

    const { password, ...userWithoutPassword } = user;

    return userWithoutPassword;
  }

  async login(credentials: Partial<User>): Promise<{ user: Omit<User, 'password'>; token: string } | null> {
    if (!credentials.email || !credentials.password) {
      throw new Error('Email e senha são obrigatórios');
    }

    const user = await this.userRepository.findOneBy({ email: credentials.email });
    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    const isPasswordValid = await bcrypt.compare(credentials.password, user.password);
    if (!isPasswordValid) {
      throw new Error('Senha inválida');
    }

    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET || 'default_secret',
      { expiresIn: '1h' }
    );

    const { password, ...userWithoutPassword } = user;
    return { user: userWithoutPassword, token };
  }
}