import dayjs from 'dayjs';

import * as questionRepository from '../repositories/questionRepository';
import * as tokenRepository from '../repositories/tokenRepository';

import { QuestionOnService } from '../interfaces/questionInterface';
import { schema } from '../validations/question';
import { InvalidQuestion } from '../errors/question';
import { UserNotFound } from '../errors/user';

const registerQuestion = async (
  questionInfo: QuestionOnService
): Promise<number> => {
  const validation = schema.validate(questionInfo);

  if (validation.error) throw new InvalidQuestion();

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

export { registerQuestion };
