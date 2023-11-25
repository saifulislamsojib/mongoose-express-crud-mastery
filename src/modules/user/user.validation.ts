import validateEmail from '@/utils/validateEmail';
import { z } from 'zod';

export const orderValidationSchema = z.object({
  productName: z.string().trim().min(1, 'Product name should be at least 1 character long'),
  price: z.number().positive('Price should be a positive number'),
  quantity: z.number().int().positive('Quantity should be a positive integer'),
});

const userCreateValidation = {
  userId: z
    .number()
    .int()
    .min(1, 'User ID should be at least 1')
    .positive('User ID should be positive'),
  username: z.string().trim().min(1, 'Username should be at least 1 character long'),
  password: z.string().trim().min(6, 'Password should be at least 6 characters long'),
  fullName: z
    .object({
      firstName: z.string().trim().min(1, 'First name should be at least 1 character long'),
      lastName: z.string().trim().min(1, 'Last name should be at least 1 character long'),
    })
    .required(),
  age: z
    .number()
    .int('Age should be a positive integer')
    .positive('Age should be a positive integer'),
  email: z.string().email('Invalid email format').refine(validateEmail, 'Invalid email format'),
  isActive: z.boolean(),
  hobbies: z
    .array(z.string().trim())
    .refine((data) => data.length > 0, 'At least 1 hobby is required'),
  address: z
    .object({
      street: z.string().trim().min(1, 'Street should be at least 1 character long'),
      city: z.string().trim().min(1, 'City should be at least 1 character long'),
      country: z.string().trim().min(1, 'Country should be at least 1 character long'),
    })
    .required(),
  orders: z.array(orderValidationSchema).optional(),
};

export const UserCreateValidationSchema = z.object(userCreateValidation);

const userUpdateValidation = {
  userId: z
    .number()
    .int()
    .min(1, 'User ID should be at least 1')
    .positive('User ID should be positive')
    .optional(),
  username: z.string().trim().min(1, 'Username should be at least 1 character long').optional(),
  fullName: z
    .object({
      firstName: z
        .string()
        .trim()
        .min(1, 'First name should be at least 1 character long')
        .optional(),
      lastName: z
        .string()
        .trim()
        .min(1, 'Last name should be at least 1 character long')
        .optional(),
    })
    .optional(),
  age: z
    .number()
    .int('Age should be a positive integer')
    .positive('Age should be a positive integer')
    .optional(),
  email: z
    .string()
    .email('Invalid email format')
    .refine(validateEmail, 'Invalid email format')
    .optional(),
  isActive: z.boolean().optional(),
  hobbies: z
    .array(z.string().trim())
    .refine((data) => data.length > 0, 'At least 1 hobby is required')
    .optional(),
  address: z
    .object({
      street: z.string().trim().min(1, 'Street should be at least 1 character long').optional(),
      city: z.string().trim().min(1, 'City should be at least 1 character long').optional(),
      country: z.string().trim().min(1, 'Country should be at least 1 character long').optional(),
    })
    .optional(),
};

export const UserUpdateValidationSchema = z.object(userUpdateValidation);
