import { Request, Response, NextFunction } from 'express';

import * as userService from '../services/userService';

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  const { name, classId } = req.body;

  if (!name || !classId)
    return res
      .status(400)
      .send(
        'Requisição inválida, insira um nome entre três e 20 caractéres e uma classe válida'
      );

  try {
    const token = await userService.createUser(req.body);

    return res.send({ token });
  } catch (error: any) {
    if (error.name === 'invalidUser')
      return res.status(400).send(error.message);

    next(error);
  }
};

const getTopUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await userService.getTopUsers();

    return res.send(users);
  } catch (error) {
    next(error);
  }
};

export { createUser, getTopUsers };
