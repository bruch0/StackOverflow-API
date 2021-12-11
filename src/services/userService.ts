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

const getTopUsers = async () => {
  const users = await userRepository.getTopUsers();

  users.forEach((user) => {
    user.points = user.total_score;
    delete user.total_score;
    delete user.id;
    delete user.class_id;
  });

  return users;
};

export { createUser, getTopUsers };
