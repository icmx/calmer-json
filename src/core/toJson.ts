import { EntryMapper } from '../types/EntryMapper';
import { ErrorHandler } from '../types/ErrorHandler';
import { createDefaultErrorHandler } from '../utils/createDefaultErrorHandler';
import { createDefaultReplacer } from '../utils/createDefaultReplacer';

/** Options for `toJson` function. Compatible with standard JSON.stringify */
export type ToJsonOptions = {
  /** Function to transform value entries (if any) */
  replacer?: EntryMapper;

  /** String to use to indent or number of spaces for indentation */
  space?: string | number;

  /** Callback to handle possible errors and provide a fallback value */
  onError?: ErrorHandler<string>;
};

/**
 * Calmer wrapper for standard JSON.stringify function.
 *
 * Unlike JSON.stringify, `toJson` never throws on circular references
 * or BigInt values. It just ignores them as non-serializable values.
 *
 * @param value Value to stringify to a JSON text
 * @param options Stringification options
 */
export const toJson = <T = unknown>(
  value: T,
  options: ToJsonOptions = {}
): string => {
  const replacer = options.replacer || createDefaultReplacer();
  const space = options.space || undefined;
  const onError = options.onError || createDefaultErrorHandler();

  try {
    return JSON.stringify(value, replacer, space);
  } catch (error) {
    return onError(error);
  }
};
