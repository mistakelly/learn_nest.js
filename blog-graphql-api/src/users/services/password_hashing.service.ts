import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class PasswordHashingService {
  private readonly saltRounds = 10;

  /**
   * Hash a password before storing it in the database.
   * @param password - The plain text password.
   * @returns The hashed password.
   */
  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(this.saltRounds);
    return await bcrypt.hash(password, salt);
  }

  /**
   * Compare a plain text password with a hashed password.
   * @param plainPassword - The plain text password provided by the user.
   * @param hashedPassword - The hashed password stored in the database.
   * @returns True if the passwords match, false otherwise.
   */
  async comparePasswords(
    plainPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }
}
