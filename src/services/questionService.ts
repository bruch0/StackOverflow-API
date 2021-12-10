import dayjs from 'dayjs';

import * as questionRepository from '../repositories/questionRepository';
import * as tokenRepository from '../repositories/tokenRepository';

import { Answer, Question } from '../interfaces/questionInterface';
import { questionSchema, answerSchema } from '../validations/question';
import {
  InvalidAnswer,
  InvalidQuestion,
  QuestionAnswered,
  QuestionNotFound,
} from '../errors/question';
import { UserNotFound } from '../errors/user';

const registerQuestion = async (questionInfo: Question): Promise<number> => {
  const validation = questionSchema.validate(questionInfo);

  if (validation.error) throw new InvalidAnswer();

  const userInfo = await tokenRepository.getUserInfoByToken(
    questionInfo.userToken
  );

  if (!userInfo) throw new UserNotFound();

  const { userId, userClassId } = userInfo;

  const { question, tags } = questionInfo;

  const submitionDate = dayjs().format('YYYY-MM-DD HH:mm');

  const questionId = await questionRepository.registerQuestion({
    question,
    tags,
    userId,
    userClassId,
    submitionDate,
  });

  return questionId;
};

const answerQuestion = async (answerInfo: Answer) => {
  const { questionId, answer, userToken } = answerInfo;

  const isAlreadyAnswered =
    await questionRepository.checkQuestionIsAlreadyAnswered(questionId);
  if (isAlreadyAnswered) throw new QuestionAnswered();

  const validation = answerSchema.validate({ answer });
  if (validation.error) throw new InvalidQuestion();

  const userInfo = await tokenRepository.getUserInfoByToken(userToken);
  if (!userInfo) throw new UserNotFound();

  const { userId } = userInfo;
  const answerDate = dayjs().format('YYYY-MM-DD HH:mm');

  await questionRepository.answerQuestion(
    questionId,
    answer,
    answerDate,
    userId
  );
};

export { registerQuestion, answerQuestion };
