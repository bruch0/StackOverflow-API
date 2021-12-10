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
    if (error.name === 'invalidQuestion')
      return res.status(400).send(error.message);
    if (error.name === 'userNotFound')
      return res.status(404).send(error.message);

    next(error);
  }
};

const answerQuestion = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { answer } = req.body;
  const { authorization } = req.headers;
  const questionId: number = Number(req.params.questionId);

  if (!authorization || authorization.indexOf('Bearer ') !== 0)
    return res
      .status(401)
      .send('Envie seu token no formato Bearer token nos headers');

  const userToken = authorization.replace('Bearer ', '');

  if (!userToken || !answer || !questionId || questionId < 1)
    return res
      .status(400)
      .send('Requisição inválida, insira seu token e a resposta');

  try {
    await questionService.answerQuestion({ userToken, answer, questionId });

    return res.sendStatus(200);
  } catch (error: any) {
    if (error.name === 'invalidQuestion')
      return res.status(400).send(error.message);
    if (error.name === 'userNotFound')
      return res.status(404).send(error.message);
    if (error.name === 'questionAnswered')
      return res.status(403).send(error.message);

    next(error);
  }
};

const getQuestion = async (req: Request, res: Response, next: NextFunction) => {
  const questionId = Number(req.params.questionId);

  if (!questionId || questionId < 1) return res.status(400).send('Id inválido');

  try {
    const question = await questionService.getQuestion(questionId);

    return res.send(question);
  } catch (error) {
    if (error.name === 'questionNotFound')
      return res.status(403).send(error.message);

    next(error);
  }
};

export { registerQuestion, answerQuestion, getQuestion };
