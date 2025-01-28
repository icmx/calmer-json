import { ErrorHandler } from '../types/ErrorHandler';

export const createDefaultErrorHandler = (): ErrorHandler<never> => {
  return (error: unknown) => {
    throw error;
  };
};
