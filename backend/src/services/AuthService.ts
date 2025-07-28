import { AppDataSource } from "../data-source";
import { User } from "../entities/User";
import * as bcrypt from "bcryptjs";

export class AuthService {
  private userRepository = AppDataSource.getRepository(User);

  async register(userData: Partial<User>): Promise<Omit<User, 'password'>> {
    if (!userData.email || !userData.password) {
      throw new Error("Email e senha são obrigatórios");
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
}