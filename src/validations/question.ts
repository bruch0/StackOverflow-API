import joi from 'joi';

const questionSchema = joi.object({
  userToken: joi.string().required(),
  question: joi.string().required().min(10).max(220),
  tags: joi.string().required().min(2).max(220),
});

const answerSchema = joi.object({
  answer: joi.string().required().min(10).max(220),
});

export { questionSchema, answerSchema };
