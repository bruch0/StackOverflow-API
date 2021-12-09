import { v4 as uuid } from 'uuid';

import * as userRepository from '../repositories/userRepository';
import * as tokenRepository from '../repositories/tokenRepository';

import { User } from '../interfaces/userInterface';
import { schema } from '../validations/user';
import { InvalidUser } from '../errors/user';

const createUser = async (userInfo: User): Promise<string> => {
  const validation = schema.validate(userInfo);

  if (validation.error) throw new InvalidUser();

  const userId: number = await userRepository.createUser(userInfo);

  const token: string = uuid();

  await tokenRepository.regiserUserToken(userId, token);

  return token;
};

export { createUser };
