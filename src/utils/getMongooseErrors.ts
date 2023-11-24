import { MongooseValidationError } from '@/interfaces/common';

// get mongoose validation errors
const getMongooseErrors = (error: unknown, collectionName: string) => {
  let errors: Record<string, string> | null = null;

  if (error instanceof Error) {
    const err = error as MongooseValidationError;

    // duplicate error
    if (err.code === 11000 && err.keyPattern) {
      if (!errors) {
        errors = {};
      }
      Object.keys(err.keyPattern).forEach((key) => {
        errors![key] = `This ${key} is already used in an another ${collectionName}`;
      });
    }

    // validation error
    if (err.message.includes('validation failed') && err.errors) {
      if (!errors) {
        errors = {};
      }
      Object.values(err.errors).forEach(({ properties }) => {
        errors![properties.path] = properties.message;
      });
    }
  }
  return errors;
};

export default getMongooseErrors;
