import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class BcryptService {
  private readonly saltOrRounds = 10;

  public generateHash(password: string): Promise<string> {
    return bcrypt.hash(password, this.saltOrRounds);
  }
}
