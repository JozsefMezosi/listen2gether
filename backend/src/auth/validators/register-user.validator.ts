import Joi from 'joi';
import { NewUser } from '../../user/model';

const validateUserRegisterDataSchema = Joi.object<NewUser>({
  email: Joi.string().max(256).email().required().trim(),
  password: Joi.string()
    .min(8)
    .max(256)
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)
    .required()
    .trim()
    .messages({
      'string.pattern.base': 'The password must contain at least 8 characters with 1 uppercase letter and 1 number!',
    }),
  user_name: Joi.string().max(256).required().trim(),
});

export const validateUserRegistrationData = (userData: NewUser) =>
  validateUserRegisterDataSchema.validateAsync(userData, {
    abortEarly: false,
  });
