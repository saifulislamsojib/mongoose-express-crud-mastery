import { MongooseValidationError } from '@/interfaces/common';

// get mongoose validation errors
const getMongooseErrors = (err: MongooseValidationError, collectionName: string) => {
  const errors = {} as Record<string, string>;

  // duplicate error
  if (err.code === 11000 && err.keyPattern) {
    Object.keys(err.keyPattern).forEach((key) => {
      errors[key] = `This ${key} is already used in an another ${collectionName}`;
    });
  }

  // validation error
  if (err.message.includes('validation failed') && err.errors) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }
  return errors;
};

export default getMongooseErrors;
