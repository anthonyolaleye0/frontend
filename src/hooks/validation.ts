import Joi from 'joi';

const passwordRegex =
  /^(?=.*[!@#$%^&*()_+{}[\]:;<>,.?~\\/-])(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{8,32}$/;

const phoneNumberPattern = /^[0-9+]{10,14}$/;
const forbiddenCharsRegex = /^[^|!{}()&=[\]===><>]+$/;

export const joiLoginValidationSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .trim()
    .required()
    .messages({
      'string.empty': 'Email is required.',
      'string.email': 'Please provide a valid email.',
    }),
  password: Joi.string()
    .min(8)
    .max(32)
    .pattern(passwordRegex)
    .trim()
    .required()
    .messages({
      'string.empty': 'Password is required.',
      'string.min': 'Password must be minimum of 8 characters.',
      'string.max': 'Password must be maximum of 32 characters.',
      'string.pattern.base':
        'Password must contain at least one lowercase, one uppercase, one number and one special character',
    }),
});

export const joiForgotValidationSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .trim()
    .required()
    .messages({
      'string.empty': 'Email is required.',
      'string.email': 'Please provide a valid email.',
    }),
});

export const joiRegisterValidationSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .trim()
    .required()
    .messages({
      'string.empty': 'Email is required.',
      'string.email': 'Please provide a valid email.',
    }),

  whatsappPhoneNumber: Joi.string().pattern(phoneNumberPattern).messages({
    'string.pattern.base': 'Please provide a valid whatsapp number',
  }),
  businessType: Joi.string()
    .valid('SME', 'Individual', 'Consultant')
    .required()
    .messages({
      'any.only': 'Business type must be either SME, Individual, or Consultant',
      'string.empty': 'Please select a business type.',
    }),
  lastName: Joi.string()
    .min(3)
    .required()
    .pattern(new RegExp(`^[^${forbiddenCharsRegex.source}]*$`))
    .messages({
      'string.min': 'Last name length must be at least 3 characters long',
      'string.empty': 'Last name is required',
      'string.pattern.base': 'Invalid characters in last name field',
    }),
  firstName: Joi.string()
    .min(3)
    .required()
    .pattern(new RegExp(`^[^${forbiddenCharsRegex.source}]*$`))
    .messages({
      'string.min': 'First name length must be at least 3 characters long',
      'string.empty': 'First name is required',
      'string.pattern.base': 'Invalid characters in first name field',
    }),
  password: Joi.string()
    .min(8)
    .max(32)
    .pattern(passwordRegex)
    .trim()
    .required()
    .messages({
      'string.empty': 'Password is required.',
      'string.min': 'Password must be minimum of 8 characters.',
      'string.max': 'Password must be maximum of 32 characters.',
      'string.pattern.base':
        'Password must contain at least one lowercase, one uppercase, one number and one special character',
    }),
  confirmPassword: Joi.string().valid(Joi.ref('password')).required().messages({
    'any.only': 'Password and confirm password do not match',
  }),
});

export const joiResetPasswordValidationSchema = Joi.object({
  token: Joi.string().trim().required().messages({
    'string.empty': 'Token is required.',
  }),
  password: Joi.string()
    .min(8)
    .max(32)
    .pattern(passwordRegex)
    .trim()
    .required()
    .messages({
      'string.empty': 'Password is required.',
      'string.min': 'Password must be minimum of 8 characters.',
      'string.max': 'Password must be maximum of 32 characters.',
      'string.pattern.base':
        'Password must contain at least one lowercase, one uppercase, one number and one special character',
    }),
  confirm_password: Joi.string()
    .valid(Joi.ref('password'))
    .required()
    .messages({
      'any.only': 'Password and confirm password do not match',
    }),
});

export const joiEmailVerificationSchema = Joi.object({
  code: Joi.string().length(6).pattern(/^\d+$/).required().messages({
    'string.empty': 'Verification code is required',
    'string.length': 'Code must be 6 digits',
    'string.pattern.base': 'Code must only contain numbers',
  }),
});
