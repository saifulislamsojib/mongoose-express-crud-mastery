export interface MongooseValidationError extends Error {
  code?: number;
  keyPattern?: Record<string, unknown>;
  errors?: {
    [x: string]: {
      properties: {
        path: string;
        message: string;
      };
    };
  };
}
