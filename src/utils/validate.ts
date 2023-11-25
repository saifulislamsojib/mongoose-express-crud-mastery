import { Request, Response } from 'express';
import { ZodRawShape, z } from 'zod';

const validate = <T extends ZodRawShape>(
  req: Request,
  res: Response,
  schema: z.ZodObject<T>,
  type: 'body' | 'params' | 'query' = 'body',
) => {
  const parsed = schema.safeParse(req[type]);
  if (!parsed.success) {
    let { message } = parsed.error.errors[0];
    if (message === 'Required') {
      message = `${parsed.error.errors[0].path[0]} is required`;
    }
    res.status(400).json({
      success: false,
      message,
      error: {
        code: 400,
        description: message,
      },
    });
    return null;
  }
  return parsed.data;
};

export default validate;
