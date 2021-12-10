import dayjs from 'dayjs';

import * as questionRepository from '../repositories/questionRepository';
import * as tokenRepository from '../repositories/tokenRepository';
import * as userRepository from '../repositories/userRepository';
import * as classRepostory from '../repositories/classRepository';

import {
  Answer,
  Question,
  QuestionInfo,
} from '../interfaces/questionInterface';
import { questionSchema, answerSchema } from '../validations/question';
import {
  InvalidAnswer,
  InvalidQuestion,
  QuestionAlreadyAnswered,
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
  if (isAlreadyAnswered) throw new QuestionAlreadyAnswered();

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

const getQuestion = async (questionId: number) => {
  const question = await questionRepository.getQuestion(questionId);

  if (!question) throw new QuestionNotFound();

  const username = await userRepository.getUsernameById(question.user_id);
  const userClass = await classRepostory.getUserClassById(
    question.user_class_id
  );
  let answerUsername = '';
  let questionInfo: QuestionInfo = {
    id: question.id,
    question: question.question,
    student: username,
    class: userClass,
    submitAt: question.submition_date,
    answered: Boolean(question.answer),
  };

  if (question.answer) {
    answerUsername = await userRepository.getUsernameById(
      question.user_answer_id
    );

    questionInfo.answeredAt = question.answer_date;
    questionInfo.answeredBy = answerUsername;
    questionInfo.answer = question.answer;
  }

  return questionInfo;
};

export { registerQuestion, answerQuestion, getQuestion };
