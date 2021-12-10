import joi from 'joi';

const schema = joi.object({
  name: joi.string().required().min(3).max(220),
  classId: joi.number().required().min(1).max(4),
});

export { schema };
