import { ErrorHandler } from '../types/ErrorHandler';

/**
 * Creates a function to handle any errors occured in `toJson` and
 * `fromJson` functions. By default will throw existing error, so
 * technically it does nothing.
 */
export const createDefaultErrorHandler = (): ErrorHandler<never> => {
  return (error: unknown) => {
    throw error;
  };
};
