import { EntryMapper } from '../types/EntryMapper';
import { ErrorHandler } from '../types/ErrorHandler';
import { createDefaultErrorHandler } from '../utils/createDefaultErrorHandler';

/** Options for `fromJson` function. Compatible with standard JSON.parse */
export type FromJsonOptions<T = unknown> = {
  /** Function to transform value entries (if any) */
  reviver?: EntryMapper;

  /** Callback to handle possible errors and provide a fallback value */
  onError?: ErrorHandler<T>;
};

/**
 * Calmer wrapper of standard JSON.parse
 *
 * @param text String to parse from JSON text to a value
 * @param options Parsing options
 */
export const fromJson = <T = unknown>(
  text: string,
  options: FromJsonOptions<T> = {}
): T => {
  const reviver = options.reviver || undefined;
  const onError = options.onError || createDefaultErrorHandler();

  try {
    return JSON.parse(text, reviver);
  } catch (error) {
    return onError(error);
  }
};
