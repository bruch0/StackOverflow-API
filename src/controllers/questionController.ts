import { Request, Response, NextFunction } from 'express';

import * as questionService from '../services/questionService';

const registerQuestion = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { question, tags } = req.body;
  const { authorization } = req.headers;

  if (!authorization || authorization.indexOf('Bearer ') !== 0)
    return res
      .status(401)
      .send('Envie seu token no formato Bearer token nos headers');

  const userToken = authorization.replace('Bearer ', '');

  if (!userToken || !question || !tags)
    return res
      .status(400)
      .send(
        'Requisição inválida, insira seu token, a sua pergunta e as tags separadas por vírulas'
      );

  try {
    const questionId = await questionService.registerQuestion({
      userToken,
      question,
      tags,
    });

    return res.send({ questionId });
  } catch (error: any) {
    if (error.name === 'userNotFound')
      return res.status(400).send(error.message);

    next(error);
  }
};

export { registerQuestion };
