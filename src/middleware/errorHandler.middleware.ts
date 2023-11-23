import { ErrorRequestHandler, RequestHandler } from 'express';

export const notFound: RequestHandler = (_req, res) => {
  res.status(404).json({ message: 'Requested URL is not found' });
};

const errorHandler: ErrorRequestHandler = (err, _req, res, next) => {
  if (res.headersSent) {
    return next('There was a problem!');
  }
  return res.status(500).json({ message: err.message || 'Something went wrong!' });
};

export default errorHandler;
